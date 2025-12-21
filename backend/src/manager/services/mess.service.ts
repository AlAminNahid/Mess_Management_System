import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async deactivateMember(memberID: number, userID: number) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const member = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    member.is_active = false;
    await this.memberRepository.save(member);

    return {
      message: 'Member deactivated successfully',
      member_id: member.id,
      is_active_status: member.is_active,
      manager_name: user.name,
    };
  }

  async deactivateMess(messID: number, userID: number) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!mess) {
      throw new NotFoundException('Mess not found');
    }

    mess.is_active = false;
    await this.messRepository.save(mess);

    await this.memberRepository
      .createQueryBuilder()
      .update()
      .set({ is_active: false })
      .where('messId = :messID', { messID })
      .execute();

    return {
      message: 'Mess and all members deactivated successfully',
      mess_id: mess.id,
      mess_name: mess.name,
      manager: user.name,
    };
  }
}
