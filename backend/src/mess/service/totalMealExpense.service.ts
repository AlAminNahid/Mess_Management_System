import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TotalMealExpenseService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async getTotalMealExpense(userID: number) {
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

    const result = await this.mealExpenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.member', 'member')
      .leftJoin('member.mess', 'mess')
      .select('SUM(expense.amount)', 'totalExpense')
      .where('mess.id = :messID', { messID })
      .getRawOne();

    return {
      messID,
      totalExpense: Number(result.totalExpense) || 0,
    };
  }
}
