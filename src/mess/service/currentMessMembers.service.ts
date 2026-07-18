import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrentMessMembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
  ) {}

  async getCurrentMessMembers(userID: number) {
    const managerMember = await this.memberRepository.findOne({
      relations: {
        mess: true,
      },
      where: { user: { id: userID }, is_active: true },
    });
    if (!managerMember) {
      throw new NotFoundException('Manager is not an active member of any mess');
    }

    const members = await this.memberRepository.find({
      relations: {
        user: true,
      },
      where: {
        mess: { id: managerMember.mess.id },
        is_active: true,
      },
      order: {
        id: 'ASC',
      },
    });

    return {
      messID: managerMember.mess.id,
      messName: managerMember.mess.name,
      members: members.map((member) => ({
        member_id: member.id,
        user_id: member.user.id,
        name: member.user.name,
        email: member.user.email,
        phone: member.user.phone,
        role: member.role,
      })),
    };
  }
}
