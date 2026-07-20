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

  async getAllMesses(userID: number, page: number, limit: number) {
    const userInfo = await this.usersRepository.findOne({
      where: { id: userID },
    });

    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    const [messes, total] = await this.messRepository.findAndCount({
      select: {
        id: true,
        name: true,
        address: true,
      },
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      message: 'All the messes',
      messes,
      page,
      limit,
      total,
    };
  }
}
