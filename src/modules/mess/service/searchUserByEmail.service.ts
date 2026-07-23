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
export class SearchUserByEmailService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async searchUserByEmail(userID: number, email: string) {
    const manager = await this.memberRepository.findOne({
      where: { user: { id: userID }, role: UserRole.MANAGER, is_active: true },
    });
    if (!manager) {
      throw new UnauthorizedException('You are not a manager of a mess');
    }

    const targetUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (!targetUser) {
      throw new NotFoundException('No user found with this email');
    }

    if (targetUser.id === userID) {
      throw new BadRequestException('You cannot invite yourself');
    }

    const existingMembership = await this.memberRepository.findOne({
      where: { user: { id: targetUser.id }, is_active: true },
    });
    if (existingMembership) {
      throw new BadRequestException('This user is already part of a mess');
    }

    return {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
    };
  }
}
