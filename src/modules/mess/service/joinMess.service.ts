import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { decryptMessPassword } from 'src/utility/mess-password.util';

@Injectable()
export class JoinMessService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    private config: ConfigService,
  ) {}

  async joinMess(name: string, password: string, userID: number) {
    const mess_info = await this.messRepository.findOne({
      where: { name },
    });
    if (!mess_info) {
      throw new UnauthorizedException('Invalid mess name or password');
    }

    const key = this.config.get<string>('MESS_PASSWORD_ENCRYPTION_KEY')!;
    let passwordMatches = false;
    try {
      passwordMatches =
        decryptMessPassword(mess_info.password, key) === password;
    } catch {
      passwordMatches = false;
    }
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid mess name or password');
    }

    const user_info = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!user_info) {
      throw new NotFoundException('User not found');
    }

    const existing_member = await this.memberRepository.findOne({
      where: {
        user: { id: userID },
        is_active: true,
      },
      relations: ['user', 'mess'],
    });
    if (existing_member) {
      throw new BadRequestException(
        'You are already a member of a mess. Leave your current mess before joining another one.',
      );
    }

    const member = await this.memberRepository.create({
      mess: mess_info,
      user: user_info,
      role: 'member',
    });

    await this.memberRepository.save(member);

    const info_show = {
      id: member.id,
      member_name: user_info.name,
      member_email: user_info.email,
      member_phone: user_info.phone,
      member_role: member.role,
      mess_name: mess_info.name,
      mess_address: mess_info.address,
    };

    return {
      message: 'Member joined successfully',
      'mess & member info': info_show,
    };
  }
}
