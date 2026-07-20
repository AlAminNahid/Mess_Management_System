import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordService {
  private readonly logger = new Logger(ChangePasswordService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UsersEntity> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (!existing) {
      throw new BadRequestException('User not found');
    }

    const valid = await bcrypt.compare(oldPassword, existing.password);
    if (!valid) {
      throw new BadRequestException('Old password is not matched');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const user = await this.usersRepository.update(
      { email },
      { password: hashPassword },
    );

    this.logger.log(`Password changed for user ${existing.id}`);

    const { password: _, ...result } = user as any;

    return result;
  }
}
