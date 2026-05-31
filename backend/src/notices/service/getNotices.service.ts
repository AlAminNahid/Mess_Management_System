import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetNoticesService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(NoticesEntity)
    private noticeRepository: Repository<NoticesEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async getNotices(messID: number, userID: number) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!mess) {
      throw new NotFoundException('Mess not found');
    }

    const notices = await this.noticeRepository.find({
      select: {
        title: true,
        description: true,
        notice_type: true,
        posted_date: true,
        member: {
          id: true,
          role: true,
          user: { id: true, name: true },
          mess: { name: true, address: true },
        },
      },
      relations: {
        member: {
          user: true,
          mess: true,
        },
      },
      where: {
        member: {
          mess: { id: messID },
        },
      },
    });

    return {
      message: 'All the notices',
      notices,
    };
  }
}
