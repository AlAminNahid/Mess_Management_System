import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodayTotalMealsService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}

  async getTodayTotalMeals(userID: number) {
    const member = await this.memberRepository.findOne({
      where: {
        user: { id: userID },
      },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const messID = member.mess.id;

    const result = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoin('meal.member', 'member')
      .leftJoin('member.mess', 'mess')
      .select('SUM(meal.meal_count)', 'todayTotalMeals')
      .where('mess.id = :messID', { messID })
      .andWhere(
        "DATE((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') = DATE(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .getRawOne();

    return {
      messID,
      messName: member.mess.name,
      date: this.currentDateInBangladesh(),
      todayTotalMeals: Number(result.todayTotalMeals) || 0,
    };
  }

  private currentDateInBangladesh() {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());

    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;

    return `${year}-${month}-${day}`;
  }
}
