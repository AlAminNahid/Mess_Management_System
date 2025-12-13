import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
  ) {}

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
    if (!member) {
      const payload = {
        sub: user.id,
        email: user.email,
      };
      const token = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
        message:
          'You are not in any mess. Would you like to join one or create one?',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }

    const payload = {
      sub: user.id,
      email: user.email,
      memberID: member.id,
      role: member.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
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
