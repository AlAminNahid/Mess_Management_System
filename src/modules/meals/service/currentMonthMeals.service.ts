import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';
import { formatDateInBangladesh } from 'src/utility/bangladesh-date.util';

@Injectable()
export class CurrentMonthMealsService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}

  async getCurrentMonthMeals(userID: number) {
    const member = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const meals = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoin('meal.member', 'member')
      .leftJoin('member.user', 'user')
      .leftJoin('member.mess', 'mess')
      .select('meal.id', 'id')
      .addSelect('meal.date', 'date')
      .addSelect('meal.meal_type', 'meal_type')
      .addSelect('meal.meal_count', 'meal_count')
      .addSelect('member.id', 'member_id')
      .addSelect('user.name', 'member_name')
      .where('mess.id = :messID', { messID: member.mess.id })
      .andWhere(
        "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .andWhere(
        "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
      )
      .orderBy('meal.date', 'DESC')
      .addOrderBy('user.name', 'ASC')
      .getRawMany();

    return {
      messID: member.mess.id,
      messName: member.mess.name,
      meals: meals.map((meal) => ({
        id: Number(meal.id),
        date: formatDateInBangladesh(meal.date),
        meal_type: meal.meal_type,
        meal_count: Number(meal.meal_count) || 0,
        member_id: Number(meal.member_id),
        member_name: meal.member_name,
      })),
    };
  }
}
