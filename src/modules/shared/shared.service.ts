import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SharedService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private membersRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealsRepository: Repository<MealsEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async getUserById(userID: number) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
      select: ['name', 'email', 'phone'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUserProfile(userID: number, name: string, phone: string) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.name = name;
    user.phone = phone;

    await this.userRepository.save(user);

    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async getMessByUserID(userID: number) {
    const member = await this.membersRepository.findOne({
      where: {
        user: { id: userID },
        is_active: true,
      },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member.mess.id;
  }

  async getUserMeals(userID: number) {
    const member = await this.membersRepository.findOne({
      where: { user: { id: userID }, is_active: true },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const result = await this.mealsRepository
      .createQueryBuilder('meal')
      .select('SUM(meal.meal_count)', 'totalMeals')
      .where('meal.member_id = :member_id', { member_id: member.id })
      .getRawOne();

    return {
      totalMeals: Number(result.totalMeals) || 0,
    };
  }

  async getUserMoneySubmit(userID: number) {
    const member = await this.membersRepository.findOne({
      where: { user: { id: userID }, is_active: true },
    });

    if (!member) {
      throw new NotFoundException('member not found');
    }

    const result = await this.mealExpenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'totalAmount')
      .where('expense.member_id = :member_id', { member_id: member.id })
      .getRawOne();

    return {
      totalAmount: Number(result.totalAmount),
    };
  }
}
