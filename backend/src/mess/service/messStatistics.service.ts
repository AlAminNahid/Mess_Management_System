import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessStatisticsService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}

  async getMessStatistics(userID: number) {
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

    const totalMembers = await this.memberRepository.count({
      where: {
        mess: { id: messID },
        is_active: true,
      },
    });

    const totalMealsResult = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoin('meal.member', 'member')
      .leftJoin('member.mess', 'mess')
      .select('SUM(meal.meal_count)', 'totalMeals')
      .where('mess.id = :messID', { messID })
      .andWhere(
        "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .andWhere(
        "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
      )
      .getRawOne();

    const totalMeals = Number(totalMealsResult.totalMeals) || 0;

    return {
      messID,
      messName: member.mess.name,
      totalMembers,
      totalMeals,
    };
  }
}
