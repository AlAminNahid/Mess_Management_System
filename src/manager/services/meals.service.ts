import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}
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
}
