import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepositor: Repository<MealExpenseIterationsEntity>,
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(NoticesEntity)
    private noticeRepository: Repository<NoticesEntity>,
  ) {}

  getMemberDashboard(): string {
    return 'Welcome to the dashboard member';
  }

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

  
}
