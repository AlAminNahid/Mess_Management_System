import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrentMessService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
  ) {}

  async getCurrentMess(userID: number) {
    const member = await this.memberRepository.findOne({
      where: {
        user: { id: userID },
      },
      relations: ['user', 'mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const messInfo = {
      member_id: member.id,
      role: member.role,

      mess_id: member.mess.id,
      mess_name: member.mess.name,
      mess_address: member.mess.address,

      user_id: member.user.id,
      user_name: member.user.name,
      user_email: member.user.email,
      user_phone: member.user.phone,
    };

    return {
      message: 'Current mess information fetched successfully',
      messInfo,
    };
  }
}
