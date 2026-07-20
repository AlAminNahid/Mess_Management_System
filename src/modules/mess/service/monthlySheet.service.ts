import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonthlySheetService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async getMonthlySheet(userID: number, period: 'current' | 'last' = 'current') {
    const member = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const monthOffset = period === 'last' ? -1 : 0;

    const [messMembers, mealTotals, expenseTotals] = await Promise.all([
      this.memberRepository.find({
        where: { mess: { id: member.mess.id }, is_active: true },
        relations: ['user'],
      }),
      this.mealRepository
        .createQueryBuilder('meal')
        .leftJoin('meal.member', 'member')
        .leftJoin('member.mess', 'mess')
        .select('member.id', 'member_id')
        .addSelect('SUM(meal.meal_count)', 'total_meals')
        .where('mess.id = :messID', { messID: member.mess.id })
        .andWhere(
          "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + make_interval(months => :monthOffset)",
          { monthOffset },
        )
        .andWhere(
          "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + make_interval(months => :monthOffset + 1)",
          { monthOffset },
        )
        .groupBy('member.id')
        .getRawMany(),
      this.mealExpenseRepository
        .createQueryBuilder('expense')
        .leftJoin('expense.member', 'member')
        .leftJoin('member.mess', 'mess')
        .select('member.id', 'member_id')
        .addSelect('SUM(expense.amount)', 'total_amount')
        .where('mess.id = :messID', { messID: member.mess.id })
        .andWhere(
          "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + make_interval(months => :monthOffset)",
          { monthOffset },
        )
        .andWhere(
          "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + make_interval(months => :monthOffset + 1)",
          { monthOffset },
        )
        .groupBy('member.id')
        .getRawMany(),
    ]);

    const totalMealsByMember = new Map<number, number>(
      mealTotals.map((row) => [Number(row.member_id), Number(row.total_meals) || 0]),
    );
    const totalBazarByMember = new Map<number, number>(
      expenseTotals.map((row) => [Number(row.member_id), Number(row.total_amount) || 0]),
    );

    const members = messMembers
      .map((messMember) => ({
        member_id: messMember.id,
        member_name: messMember.user.name,
        total_meals: totalMealsByMember.get(messMember.id) ?? 0,
        total_bazar: totalBazarByMember.get(messMember.id) ?? 0,
      }))
      .sort((a, b) => a.member_name.localeCompare(b.member_name));

    return {
      messID: member.mess.id,
      messName: member.mess.name,
      totalMeals: members.reduce((sum, m) => sum + m.total_meals, 0),
      totalBazar: members.reduce((sum, m) => sum + m.total_bazar, 0),
      members,
    };
  }
}
