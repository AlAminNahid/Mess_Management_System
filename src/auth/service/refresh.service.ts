import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    const accessPayload = {
      sub: user.id,
      email: user.email,
      type: 'access',
      ...(member ? { memberID: member.id, role: member.role } : {}),
    };
    const access_token = await this.jwtService.signAsync(accessPayload);

    const newRefreshPayload = { sub: user.id, type: 'refresh' };
    const newRefreshToken = await this.jwtService.signAsync(newRefreshPayload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    } as JwtSignOptions);

    user.hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await this.usersRepository.save(user);

    return { access_token, refresh_token: newRefreshToken };
  }
}
