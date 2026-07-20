import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { issueAuthTokens } from 'src/utility/issue-tokens.util';

@Injectable()
export class RefreshService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    let payload: { sub: number; type: string };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException();
    }

    const matches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!matches) {
      // Token reuse / theft: invalidate the stored token so the stolen
      // refresh token can no longer be used either.
      user.hashedRefreshToken = null;
      await this.usersRepository.save(user);
      throw new UnauthorizedException();
    }

    const member = await this.memberRepository.findOne({
      where: { user: { id: user.id }, is_active: true },
    });

    const { access_token, refresh_token: newRefreshToken } =
      await issueAuthTokens(
        this.jwtService,
        this.config,
        this.usersRepository,
        user,
        member,
      );

    return { access_token, refresh_token: newRefreshToken };
  }
}
