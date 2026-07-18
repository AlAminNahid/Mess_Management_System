import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealRateService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async getMealRate(userID: number) {
    const member = await this.memberRepository.findOne({
      where: {
        user: { id: userID },
        is_active: true,
      },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const messID = member.mess.id;

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

    const totalExpenseResult = await this.mealExpenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.member', 'member')
      .leftJoin('member.mess', 'mess')
      .select('SUM(expense.amount)', 'totalExpense')
      .where('mess.id = :messID', { messID })
      .andWhere(
        "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .andWhere(
        "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
      )
      .getRawOne();

    const totalExpense = Number(totalExpenseResult.totalExpense) || 0;

    const mealRate = totalMeals > 0 ? totalExpense / totalMeals : 0;

    return {
      messID,
      messName: member.mess.name,
      totalMeals,
      totalExpense,
      mealRate: Number(mealRate.toFixed(2)),
    };
  }
}
