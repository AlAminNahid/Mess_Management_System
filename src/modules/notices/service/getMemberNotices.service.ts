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
export class GetMemberNoticesService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(NoticesEntity)
    private noticeRepository: Repository<NoticesEntity>,
  ) {}

  async getNotices(messID: number, userID: number) {
    const validateMess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!validateMess) {
      throw new NotFoundException('There is no existing Mess with this ID');
    }

    const validateUser = await this.memberRepository.findOne({
      where: { user: { id: userID }, mess: { id: messID }, is_active: true },
    });
    if (!validateUser) {
      throw new ForbiddenException('You are no longer an active member of any mess.');
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
      relations: { member: { user: true, mess: true } },
      where: {
        member: { mess: { id: messID }, is_active: true },
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
