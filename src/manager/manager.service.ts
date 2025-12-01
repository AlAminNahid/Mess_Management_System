import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepositor: Repository<MealExpenseIterationsEntity>,
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
  ) {}

  getManagerDashboard(): string {
    return 'Welcome to the dashboard Manager';
  }

  async insertMeals(mealCount: number, memberID: number, userID: number) {
    const user = await this.userRepository.findOne({ where: { id: userID } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    const meal = await this.mealRepository.create({
      meal_count: mealCount,
      manager_id: userID,
      member: memberInfo,
    });

    await this.mealRepository.save(meal);

    return {
      message: 'Meal inserted successfully',
      member_id: memberInfo.id,
      date: meal.date,
      meal_count: meal.meal_count,
      manager_name: user.name,
    };
  }

  async updateMeals(
    mealID: number,
    mealCount: number,
    memberID: number,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingMeal = await this.mealRepository.findOne({
      where: { id: mealID },
    });
    if (!existingMeal) {
      throw new NotFoundException('Meal not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    existingMeal.meal_count = mealCount;
    existingMeal.member = memberInfo;
    existingMeal.manager_id = userID;

    await this.mealRepository.save(existingMeal);

    return {
      message: 'Meal updated successfully',
      member_id: memberInfo.id,
      date: existingMeal.date,
      meal_count: existingMeal.meal_count,
      manager_name: user.name,
    };
  }

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
