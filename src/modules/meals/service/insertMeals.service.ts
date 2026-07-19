import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsertMealsService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}

  async insertMeals(
    mealCount: number,
    memberID: number,
    mealType: string,
    date: string,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userID } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const managerMember = await this.memberRepository.findOne({
      relations: {
        mess: true,
      },
      where: { user: { id: userID }, is_active: true },
    });
    if (!managerMember) {
      throw new NotFoundException(
        'Manager is not an active member of any mess',
      );
    }

    const memberInfo = await this.memberRepository.findOne({
      relations: {
        mess: true,
      },
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }
    if (memberInfo.mess.id !== managerMember.mess.id) {
      throw new ForbiddenException('Member does not belong to your mess');
    }

    const meal = await this.mealRepository.create({
      meal_count: mealCount,
      meal_type: mealType ?? 'Lunch',
      date: new Date(date ?? new Date()) as any,
      manager_id: userID,
      member: memberInfo,
    });

    await this.mealRepository.save(meal);

    return {
      message: 'Meal inserted successfully',
      member_id: memberInfo.id,
      date: meal.date,
      meal_type: meal.meal_type,
      meal_count: meal.meal_count,
      manager_name: user.name,
    };
  }
}
