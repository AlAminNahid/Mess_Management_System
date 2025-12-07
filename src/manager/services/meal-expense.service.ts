import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealExpenseService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepositor: Repository<MealExpenseIterationsEntity>,
  ) {}

  async insertMealExpenses(
    amount: number,
    description: string,
    memberID: number,
    userID: number,
  ) {
    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const mealExpense = await this.mealExpenseRepositor.create({
      member: memberInfo,
      manager_id: userID,
      amount: amount,
      description: description,
    });

    await this.mealExpenseRepositor.save(mealExpense);

    return {
      message: 'Meal Expense Iteration is successfully inserted',
      member_id: memberInfo.id,
      amount: mealExpense.amount,
      date: mealExpense.date,
      description: mealExpense.description,
      manager_name: user.name,
    };
  }

  async updateMealExpenses(
    mealExpensID: number,
    amount: number,
    description: string,
    memberID: number,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingMealExpens = await this.mealExpenseRepositor.findOne({
      where: { id: mealExpensID },
    });
    if (!existingMealExpens) {
      throw new NotFoundException('Meal Expense Iteration is not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    existingMealExpens.amount = amount;
    existingMealExpens.description = description;
    existingMealExpens.member = memberInfo;
    existingMealExpens.manager_id = userID;

    await this.mealExpenseRepositor.save(existingMealExpens);

    return {
      message: 'Meal Expense Iteration is successfully updated',
      member_id: memberInfo.id,
      amount: existingMealExpens.amount,
      date: existingMealExpens.date,
      description: existingMealExpens.description,
      manager_name: user.name,
    };
  }
}
