import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogoutService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async logout(userID: number) {
    await this.usersRepository.update(userID, { hashedRefreshToken: null });
  }
}
