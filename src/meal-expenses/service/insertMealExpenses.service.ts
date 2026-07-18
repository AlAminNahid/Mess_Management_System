import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsertMealExpensesService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async insertMealExpenses(
    amount: number,
    description: string,
    memberID: number,
    date: string,
    userID: number,
  ) {
    const managerMember = await this.memberRepository.findOne({
      relations: { mess: true },
      where: { user: { id: userID }, is_active: true },
    });
    if (!managerMember) {
      throw new NotFoundException('Manager is not an active member of any mess');
    }

    const memberInfo = await this.memberRepository.findOne({
      relations: { mess: true },
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }
    if (memberInfo.mess.id !== managerMember.mess.id) {
      throw new ForbiddenException('Member does not belong to your mess');
    }

    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const mealExpense = await this.mealExpenseRepository.create({
      member: memberInfo,
      manager_id: userID,
      amount,
      description,
      date: new Date(date ?? new Date()) as any,
    });

    await this.mealExpenseRepository.save(mealExpense);

    return {
      message: 'Meal Expense Iteration is successfully inserted',
      member_id: memberInfo.id,
      amount: mealExpense.amount,
      date: mealExpense.date,
      description: mealExpense.description,
      manager_name: user.name,
    };
  }
}
