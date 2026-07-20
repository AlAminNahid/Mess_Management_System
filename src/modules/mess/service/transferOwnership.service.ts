import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UserRole } from 'src/dtos/auth/role.enum';
import { issueAuthTokens } from 'src/utility/issue-tokens.util';

@Injectable()
export class TransferOwnershipService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private dataSource: DataSource,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async transferOwnership(userID: number, targetMemberId: number) {
    const currentManager = await this.memberRepository.findOne({
      where: { user: { id: userID }, role: UserRole.MANAGER, is_active: true },
      relations: ['user', 'mess'],
    });

    if (!currentManager) {
      throw new UnauthorizedException('You are not a manager of a mess');
    }

    const target = await this.memberRepository.findOne({
      where: {
        id: targetMemberId,
        is_active: true,
        mess: { id: currentManager.mess.id },
      },
    });

    if (!target) {
      throw new NotFoundException('Target member not found in your mess');
    }

    if (target.id === currentManager.id) {
      throw new BadRequestException(
        'You are already the manager of this mess',
      );
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.update(MembersEntity, currentManager.id, {
        role: UserRole.MEMBER,
      });
      await manager.update(MembersEntity, target.id, {
        role: UserRole.MANAGER,
      });
    });

    const { access_token, refresh_token } = await issueAuthTokens(
      this.jwtService,
      this.config,
      this.usersRepository,
      currentManager.user,
      { ...currentManager, role: UserRole.MEMBER },
    );

    return {
      access_token,
      refresh_token,
      message: 'Ownership transferred successfully',
    };
  }
}
