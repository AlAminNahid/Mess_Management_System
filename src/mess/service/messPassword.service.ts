import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UserRole } from 'src/dtos/auth/role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  decryptMessPassword,
  encryptMessPassword,
} from '../mess-password.util';

@Injectable()
export class MessPasswordService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    private config: ConfigService,
  ) {}

  private async verifyAccountPassword(userID: number, accountPassword: string) {
    const member = await this.memberRepository.findOne({
      where: { user: { id: userID }, role: UserRole.MANAGER },
      relations: ['user', 'mess'],
    });

    if (!member) {
      throw new UnauthorizedException('You are not a manager of a mess');
    }

    const valid = await bcrypt.compare(accountPassword, member.user.password);
    if (!valid) {
      throw new UnauthorizedException('Incorrect account password');
    }

    return member;
  }

  async viewMessPassword(userID: number, accountPassword: string) {
    const member = await this.verifyAccountPassword(userID, accountPassword);
    const key = this.config.get<string>('MESS_PASSWORD_ENCRYPTION_KEY')!;

    return { mess_password: decryptMessPassword(member.mess.password, key) };
  }

  async changeMessPassword(
    userID: number,
    accountPassword: string,
    newMessPassword: string,
  ) {
    const member = await this.verifyAccountPassword(userID, accountPassword);
    const key = this.config.get<string>('MESS_PASSWORD_ENCRYPTION_KEY')!;
    const encrypted = encryptMessPassword(newMessPassword, key);

    await this.messRepository.update(member.mess.id, { password: encrypted });

    return { message: 'Mess password updated successfully' };
  }
}
