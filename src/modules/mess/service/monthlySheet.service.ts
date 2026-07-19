import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';
import { formatDateInBangladesh } from 'src/utility/bangladesh-date.util';

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

  async getMonthlySheet(userID: number) {
    const member = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const [mealRows, expenseRows] = await Promise.all([
      this.mealRepository
        .createQueryBuilder('meal')
        .leftJoin('meal.member', 'member')
        .leftJoin('member.user', 'user')
        .leftJoin('member.mess', 'mess')
        .select('meal.date', 'date')
        .addSelect('member.id', 'member_id')
        .addSelect('user.name', 'member_name')
        .addSelect('SUM(meal.meal_count)', 'total_meals')
        .where('mess.id = :messID', { messID: member.mess.id })
        .andWhere(
          "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
        )
        .andWhere(
          "((meal.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
        )
        .groupBy('meal.date')
        .addGroupBy('member.id')
        .addGroupBy('user.name')
        .orderBy('meal.date', 'DESC')
        .addOrderBy('user.name', 'ASC')
        .getRawMany(),
      this.mealExpenseRepository
        .createQueryBuilder('expense')
        .leftJoin('expense.member', 'member')
        .leftJoin('member.user', 'user')
        .leftJoin('member.mess', 'mess')
        .select('expense.date', 'date')
        .addSelect('member.id', 'member_id')
        .addSelect('user.name', 'member_name')
        .addSelect('SUM(expense.amount)', 'total_amount')
        .where('mess.id = :messID', { messID: member.mess.id })
        .andWhere(
          "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
        )
        .andWhere(
          "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
        )
        .groupBy('expense.date')
        .addGroupBy('member.id')
        .addGroupBy('user.name')
        .orderBy('expense.date', 'DESC')
        .addOrderBy('user.name', 'ASC')
        .getRawMany(),
    ]);

    const sheet = new Map<
      string,
      {
        date: string;
        totalMeals: number;
        totalBazar: number;
        meals: {
          member_id: number;
          member_name: string;
          total_meals: number;
        }[];
        bazar: {
          member_id: number;
          member_name: string;
          total_amount: number;
        }[];
      }
    >();

    mealRows.forEach((row) => {
      const date = formatDateInBangladesh(row.date);
      const day = this.ensureDay(sheet, date);
      const totalMeals = Number(row.total_meals) || 0;
      day.totalMeals += totalMeals;
      day.meals.push({
        member_id: Number(row.member_id),
        member_name: row.member_name,
        total_meals: totalMeals,
      });
    });

    expenseRows.forEach((row) => {
      const date = formatDateInBangladesh(row.date);
      const day = this.ensureDay(sheet, date);
      const totalAmount = Number(row.total_amount) || 0;
      day.totalBazar += totalAmount;
      day.bazar.push({
        member_id: Number(row.member_id),
        member_name: row.member_name,
        total_amount: totalAmount,
      });
    });

    return {
      messID: member.mess.id,
      messName: member.mess.name,
      days: Array.from(sheet.values()).sort((a, b) =>
        b.date.localeCompare(a.date),
      ),
    };
  }

  private ensureDay(
    sheet: Map<
      string,
      {
        date: string;
        totalMeals: number;
        totalBazar: number;
        meals: {
          member_id: number;
          member_name: string;
          total_meals: number;
        }[];
        bazar: {
          member_id: number;
          member_name: string;
          total_amount: number;
        }[];
      }
    >,
    date: string,
  ) {
    if (!sheet.has(date)) {
      sheet.set(date, {
        date,
        totalMeals: 0,
        totalBazar: 0,
        meals: [],
        bazar: [],
      });
    }

    return sheet.get(date)!;
  }
}
