import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllMessesService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async getAllMesses(userID: number) {
    const userInfo = await this.usersRepository.findOne({
      where: { id: userID },
    });

    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    const messes = await this.messRepository.find({
      select: {
        id: true,
        name: true,
        address: true,
      },
    });

    return {
      message: 'All the messes',
      messes,
    };
  }
}
