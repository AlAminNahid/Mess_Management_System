import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SendMemberNoticeService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(NoticesEntity)
    private noticeRepository: Repository<NoticesEntity>,
  ) {}

  async sendNotice(
    title: string,
    description: string,
    notice_type: string,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const member = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
    });
    if (!member) {
      throw new ForbiddenException('You are no longer an active member of any mess.');
    }

    const notice = await this.noticeRepository.create({
      title,
      description,
      notice_type,
      member,
    });

    await this.noticeRepository.save(notice);

    return {
      message: 'Notice is sended successfully',
      title: notice.title,
      description: notice.description,
      date: notice.posted_date,
      notice_type: notice.notice_type,
      sended_by: user.name,
    };
  }
}
