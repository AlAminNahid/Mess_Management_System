import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitesEntity, InviteStatus } from 'src/entities/invites.entity';

@Injectable()
export class DeclineInviteService {
  constructor(
    @InjectRepository(InvitesEntity)
    private inviteRepository: Repository<InvitesEntity>,
  ) {}

  async declineInvite(userID: number, inviteId: number) {
    const invite = await this.inviteRepository.findOne({
      where: {
        id: inviteId,
        invited_user: { id: userID },
        status: InviteStatus.PENDING,
      },
    });
    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    invite.status = InviteStatus.DECLINED;
    await this.inviteRepository.save(invite);

    return { message: 'Invite declined' };
  }
}
