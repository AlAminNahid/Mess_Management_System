import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForgetPasswordService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async forgetPassword(
    email: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<UsersEntity> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (!existing) {
      throw new BadRequestException('User not found');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        `New password and Confirm password didn't match`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const user = await this.usersRepository.update(
      { email },
      { password: hashPassword },
    );

    console.log('Forget password is done');

    const { password: _, ...result } = user as any;

    return result;
  }
}
