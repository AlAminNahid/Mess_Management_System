import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async createMess(name: string, address: string, userID: number) {
    const existing = await this.messRepository.findOne({ where: { name } });
    if (existing) {
      throw new BadRequestException(
        'With this name a mess is already registered, try another name',
      );
    }

    const messInfo = await this.messRepository.create({
      name,
      address,
    });
    await this.messRepository.save(messInfo);

    const userInfo = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    const memberInfo = await this.memberRepository.create({
      mess: messInfo,
      user: [userInfo],
      role: 'manager',
    });
    await this.memberRepository.save(memberInfo);

    console.log('Mess created and member inserted successfully');

    const show_info = {
      id: memberInfo.id,
      user_name: userInfo.name,
      user_email: userInfo.email,
      user_phone: userInfo.phone,
      role: memberInfo.role,
      mess_name: messInfo.name,
      mess_address: messInfo.address,
    };

    return {
      message: 'Mess created and manager inserted successfully',
      'mess & member info': show_info,
    };
  }

  async joinMess(messID: number, userID: number) {
    const mess_info = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!mess_info) {
      throw new NotFoundException('Mess not found');
    }

    const user_info = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!user_info) {
      throw new NotFoundException('User not found');
    }

    console.log(userID);

    const existing_member = await this.memberRepository.findOne({
      where: {
        user: { id: userID },
        mess: { id: messID },
      },
      relations: ['user', 'mess'],
    });
    if (existing_member) {
      throw new BadRequestException('User is already a member of a mess');
    }

    const member = await this.memberRepository.create({
      mess: mess_info,
      user: [user_info],
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
