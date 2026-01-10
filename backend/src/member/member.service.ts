import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
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
      where: { user: { id: userID } },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const notice = await this.noticeRepository.create({
      title: title,
      description: description,
      notice_type: notice_type,
      member: member,
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

  async getNotices(messID: number, userID: number) {
    const validate_mess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!validate_mess) {
      throw new NotFoundException('There is no existing Mess with this ID');
    }

    const validate_user = await this.memberRepository.findOne({
      where: { user: { id: userID }, mess: { id: messID } },
    });
    if (!validate_user) {
      throw new BadRequestException('The user is not a member of this mess');
    }

    const notices = await this.noticeRepository.find({
      select: {
        title: true,
        description: true,
        notice_type: true,
        posted_date: true,
        member: { id: true, mess: { name: true, address: true } },
      },
      where: { member: { mess: { id: messID } } },
    });

    return {
      message: 'All the notices',
      notices,
    };
  }
}
