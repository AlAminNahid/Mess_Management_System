import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { Between, Repository } from 'typeorm';
import { getCurrentBangladeshMonthRange } from 'src/utility/bangladesh-date.util';

@Injectable()
export class GetNoticesService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(NoticesEntity)
    private noticeRepository: Repository<NoticesEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async getNotices(messID: number, userID: number) {
    const managerMember = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
      relations: ['mess'],
    });
    if (!managerMember) {
      throw new NotFoundException(
        'Manager is not an active member of any mess',
      );
    }

    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!mess) {
      throw new NotFoundException('Mess not found');
    }
    if (mess.id !== managerMember.mess.id) {
      throw new ForbiddenException(
        'These notices do not belong to your mess',
      );
    }

    const { start, end } = getCurrentBangladeshMonthRange();

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
          is_active: true,
        },
        posted_date: Between(start, end),
      },
      order: { posted_date: 'DESC' },
    });

    return {
      message: 'All the notices',
      notices,
    };
  }
}
