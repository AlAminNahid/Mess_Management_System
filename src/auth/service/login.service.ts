import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private async issueTokens(user: UsersEntity, member: MembersEntity | null) {
    const accessPayload = {
      sub: user.id,
      email: user.email,
      type: 'access',
      ...(member ? { memberID: member.id, role: member.role } : {}),
    };
    const access_token = await this.jwtService.signAsync(accessPayload);

    const refreshPayload = { sub: user.id, type: 'refresh' };
    const refresh_token = await this.jwtService.signAsync(refreshPayload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    } as JwtSignOptions);

    user.hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.usersRepository.save(user);

    return { access_token, refresh_token };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    console.log('Users login successful');

    const member = await this.memberRepository.findOne({
      where: { user: { id: user.id }, is_active: true },
    });

    const { access_token, refresh_token } = await this.issueTokens(
      user,
      member,
    );

    if (!member) {
      return {
        access_token,
        refresh_token,
        message:
          'You are not in any mess. Would you like to join one or create one?',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      member: {
        id: member.id,
        role: member.role,
        is_active: member.is_active,
        mess_id: member.mess?.id,
        join_date: member.join_date,
      },
    };
  }
}
