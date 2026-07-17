import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { Repository } from 'typeorm';

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
      where: { user: { id: userID }, mess: { id: messID } },
    });
    if (!validateUser) {
      throw new BadRequestException('The user is not a member of this mess');
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
      relations: { member: { user: true, mess: true } },
      where: { member: { mess: { id: messID } } },
    });

    return {
      message: 'All the notices',
      notices,
    };
  }
}
