import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { encryptMessPassword } from 'src/utility/mess-password.util';

@Injectable()
export class CreateMessService {
  private readonly logger = new Logger(CreateMessService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    private config: ConfigService,
  ) {}

  async createMess(
    name: string,
    address: string,
    password: string,
    userID: number,
  ) {
    const existingMembership = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
    });
    if (existingMembership) {
      throw new BadRequestException(
        'You are already a member of a mess. Leave your current mess before creating another one.',
      );
    }

    const existing = await this.messRepository.findOne({ where: { name } });
    if (existing) {
      throw new BadRequestException(
        'With this name a mess is already registered, try another name',
      );
    }

    const encryptedPassword = encryptMessPassword(
      password,
      this.config.get<string>('MESS_PASSWORD_ENCRYPTION_KEY')!,
    );

    const messInfo = await this.messRepository.create({
      name,
      address,
      password: encryptedPassword,
    });
    await this.messRepository.save(messInfo);

    const userInfo = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    const memberInfo = await this.memberRepository.create({
      mess: messInfo,
      user: userInfo,
      role: 'manager',
    });
    await this.memberRepository.save(memberInfo);

    this.logger.log(
      `Mess "${messInfo.name}" (id=${messInfo.id}) created by user ${userID}`,
    );

    const show_info = {
      id: memberInfo.id,
      user_name: userInfo.name,
      user_email: userInfo.email,
      user_phone: userInfo.phone,
      role: memberInfo.role,
      mess_name: messInfo.name,
      mess_address: messInfo.address,
    };

    return {
      message: 'Mess created and welcome manager',
      'mess & member info': show_info,
    };
  }
}
