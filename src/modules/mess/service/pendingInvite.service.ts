import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitesEntity, InviteStatus } from 'src/entities/invites.entity';

@Injectable()
export class PendingInviteService {
  constructor(
    @InjectRepository(InvitesEntity)
    private inviteRepository: Repository<InvitesEntity>,
  ) {}

  async getPendingInvite(userID: number) {
    const invite = await this.inviteRepository.findOne({
      where: {
        invited_user: { id: userID },
        status: InviteStatus.PENDING,
      },
      relations: ['mess', 'invited_by'],
      order: { created_at: 'DESC' },
    });

    if (!invite) {
      return { invite: null };
    }

    return {
      invite: {
        id: invite.id,
        mess_name: invite.mess.name,
        invited_by_name: invite.invited_by.name,
      },
    };
  }
}
