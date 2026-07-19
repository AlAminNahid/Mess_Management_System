import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateMealExpensesService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepository: Repository<MealExpenseIterationsEntity>,
  ) {}

  async updateMealExpenses(
    mealExpensID: number,
    amount: number,
    description: string,
    memberID: number,
    date: string,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const managerMember = await this.memberRepository.findOne({
      relations: { mess: true },
      where: { user: { id: userID }, is_active: true },
    });
    if (!managerMember) {
      throw new NotFoundException(
        'Manager is not an active member of any mess',
      );
    }

    const existingMealExpens = await this.mealExpenseRepository.findOne({
      relations: { member: { mess: true } },
      where: { id: mealExpensID },
    });
    if (!existingMealExpens) {
      throw new NotFoundException('Meal Expense Iteration is not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      relations: { mess: true },
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }
    if (
      existingMealExpens.member.mess.id !== managerMember.mess.id ||
      memberInfo.mess.id !== managerMember.mess.id
    ) {
      throw new ForbiddenException('This expense does not belong to your mess');
    }

    existingMealExpens.amount = amount;
    existingMealExpens.description = description;
    existingMealExpens.date = new Date(date ?? existingMealExpens.date) as any;
    existingMealExpens.member = memberInfo;
    existingMealExpens.manager_id = userID;

    await this.mealExpenseRepository.save(existingMealExpens);

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
