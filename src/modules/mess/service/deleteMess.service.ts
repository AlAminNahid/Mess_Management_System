import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UserRole } from 'src/dtos/auth/role.enum';

@Injectable()
export class DeleteMessService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private dataSource: DataSource,
  ) {}

  async deleteMess(userID: number, accountPassword: string) {
    const manager = await this.memberRepository.findOne({
      where: { user: { id: userID }, role: UserRole.MANAGER, is_active: true },
      relations: ['user', 'mess'],
    });

    if (!manager) {
      throw new UnauthorizedException('You are not a manager of a mess');
    }

    const validPassword = await bcrypt.compare(
      accountPassword,
      manager.user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Incorrect account password');
    }

    const activeMemberCount = await this.memberRepository.count({
      where: { mess: { id: manager.mess.id }, is_active: true },
    });

    if (activeMemberCount > 1) {
      throw new BadRequestException(
        'Transfer ownership to another member before deleting the mess',
      );
    }

    await this.dataSource.transaction(async (transactionManager) => {
      await transactionManager.update(MessesEntity, manager.mess.id, {
        is_active: false,
      });
      await transactionManager.update(MembersEntity, manager.id, {
        is_active: false,
        leave_date: new Date(),
      });
    });

    await this.userRepository.update(manager.user.id, {
      hashedRefreshToken: null,
    });

    return { message: 'Mess deleted successfully' };
  }
}
