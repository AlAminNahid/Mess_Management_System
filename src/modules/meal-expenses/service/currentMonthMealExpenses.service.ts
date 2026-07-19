import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';
import { formatDateInBangladesh } from 'src/utility/bangladesh-date.util';

@Injectable()
export class CurrentMonthMealExpensesService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async getCurrentMonthMealExpenses(userID: number) {
    const member = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const expenses = await this.mealExpenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.member', 'member')
      .leftJoin('member.user', 'user')
      .leftJoin('member.mess', 'mess')
      .select('expense.id', 'id')
      .addSelect('expense.date', 'date')
      .addSelect('expense.amount', 'amount')
      .addSelect('expense.description', 'description')
      .addSelect('member.id', 'member_id')
      .addSelect('user.name', 'member_name')
      .where('mess.id = :messID', { messID: member.mess.id })
      .andWhere(
        "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .andWhere(
        "((expense.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
      )
      .orderBy('expense.date', 'DESC')
      .addOrderBy('user.name', 'ASC')
      .getRawMany();

    return {
      messID: member.mess.id,
      messName: member.mess.name,
      expenses: expenses.map((expense) => ({
        id: Number(expense.id),
        date: formatDateInBangladesh(expense.date),
        amount: Number(expense.amount) || 0,
        description: expense.description,
        member_id: Number(expense.member_id),
        member_name: expense.member_name,
      })),
    };
  }
}
