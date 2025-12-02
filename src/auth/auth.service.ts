import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MembersEntity } from 'src/entities/members.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    private jwtService: JwtService,
  ) {}

  async registration(
    name: string,
    email: string,
    password: string,
    nid: string,
    phone: string,
  ): Promise<UsersEntity> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      nid,
      phone,
    });
    await this.usersRepository.save(user);

    console.log('Users registration successful');

    const { password: _, ...result } = user as any;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Aunothorized password');
    }

    const member = await this.memberRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['mess'],
    });

    console.log('Users login successful');

    const payload = {
      sub: user.id,
      email: user.email,
      role : member?.role
    };
    const token = await this.jwtService.signAsync(payload);

    if (!member || member.is_active === false) {
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

  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UsersEntity> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (!existing) {
      throw new BadRequestException('User not found');
    }

    const valid = await bcrypt.compare(oldPassword, existing.password);
    if (!valid) {
      throw new BadRequestException('Old password is not matched');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const user = await this.usersRepository.update(
      { email },
      { password: hashPassword },
    );

    console.log('User password updated successfuly');

    const { password: _, ...result } = user as any;

    return result;
  }

  async forgetPassword(
    email: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<UsersEntity> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (!existing) {
      throw new BadRequestException('User not found');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        `New password and Confirm password didn't match`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const user = await this.usersRepository.update(
      { email },
      { password: hashPassword },
    );

    console.log('Forget password is done');

    const { password: _, ...result } = user as any;

    return result;
  }
}
