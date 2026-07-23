import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitesEntity, InviteStatus } from 'src/entities/invites.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UserRole } from 'src/dtos/auth/role.enum';

@Injectable()
export class AcceptInviteService {
  constructor(
    @InjectRepository(InvitesEntity)
    private inviteRepository: Repository<InvitesEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async acceptInvite(userID: number, inviteId: number) {
    const invite = await this.inviteRepository.findOne({
      where: {
        id: inviteId,
        invited_user: { id: userID },
        status: InviteStatus.PENDING,
      },
      relations: ['mess'],
    });
    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    const existingMembership = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
    });
    if (existingMembership) {
      throw new BadRequestException('You are already a member of a mess');
    }

    const user = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const member = this.memberRepository.create({
      mess: invite.mess,
      user,
      role: UserRole.MEMBER,
    });
    await this.memberRepository.save(member);

    invite.status = InviteStatus.ACCEPTED;
    await this.inviteRepository.save(invite);

    await this.inviteRepository.update(
      {
        invited_user: { id: userID },
        status: InviteStatus.PENDING,
      },
      { status: InviteStatus.DECLINED },
    );

    return { message: 'Invite accepted. Please log in again.' };
  }
}
