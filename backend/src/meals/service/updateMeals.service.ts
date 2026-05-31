import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateMealsService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}

  async updateMeals(
    mealID: number,
    mealCount: number,
    memberID: number,
    mealType: string,
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
      throw new NotFoundException('Manager is not an active member of any mess');
    }

    const existingMeal = await this.mealRepository.findOne({
      relations: { member: { mess: true } },
      where: { id: mealID },
    });
    if (!existingMeal) {
      throw new NotFoundException('Meal not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      relations: { mess: true },
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }
    if (
      existingMeal.member.mess.id !== managerMember.mess.id ||
      memberInfo.mess.id !== managerMember.mess.id
    ) {
      throw new ForbiddenException('This meal does not belong to your mess');
    }

    existingMeal.meal_count = mealCount;
    existingMeal.meal_type = mealType ?? existingMeal.meal_type;
    existingMeal.date = new Date(date ?? existingMeal.date) as any;
    existingMeal.member = memberInfo;
    existingMeal.manager_id = userID;

    await this.mealRepository.save(existingMeal);

    return {
      message: 'Meal updated successfully',
      member_id: memberInfo.id,
      date: existingMeal.date,
      meal_type: existingMeal.meal_type,
      meal_count: existingMeal.meal_count,
      manager_name: user.name,
    };
  }
}
