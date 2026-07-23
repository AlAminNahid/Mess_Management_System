import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UserRole } from 'src/dtos/auth/role.enum';

@Injectable()
export class RemoveMemberService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async removeMember(userID: number, memberId: number) {
    const manager = await this.memberRepository.findOne({
      where: { user: { id: userID }, role: UserRole.MANAGER, is_active: true },
      relations: ['mess'],
    });

    if (!manager) {
      throw new UnauthorizedException('You are not a manager of a mess');
    }

    if (manager.id === memberId) {
      throw new BadRequestException(
        'You cannot remove yourself. Transfer ownership to another member first.',
      );
    }

    const target = await this.memberRepository.findOne({
      where: {
        id: memberId,
        is_active: true,
        mess: { id: manager.mess.id },
      },
      relations: ['user'],
    });

    if (!target) {
      throw new NotFoundException('Member not found in your mess');
    }

    await this.memberRepository.update(target.id, {
      is_active: false,
      leave_date: new Date(),
    });

    // Invalidate the removed member's refresh token so their session ends
    // on the next token refresh rather than lingering for the full refresh TTL.
    await this.userRepository.update(target.user.id, {
      hashedRefreshToken: null,
    });

    return { message: 'Member removed from the mess' };
  }
}
