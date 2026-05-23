import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodayTotalMealsService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
  ) {}

  async getTodayTotalMeals(userID: number) {
    const member = await this.memberRepository.findOne({
      where: {
        user: { id: userID },
      },
      relations: ['mess'],
    });

    if (!member) {
      throw new NotFoundException('User is not an active member of any mess');
    }

    const messID = member.mess.id;

    const today = new Date().toISOString().split('T')[0];

    const result = await this.mealRepository
      .createQueryBuilder('meal')
      .leftJoin('meal.member', 'member')
      .leftJoin('member.mess', 'mess')
      .select('SUM(meal.meal_count)', 'todayTotalMeals')
      .where('mess.id = :messID', { messID })
      .andWhere('DATE(meal.created_at) = :today', { today })
      .getRawOne();

    return {
      messID,
      messName: member.mess.name,
      date: today,
      todayTotalMeals: Number(result.todayTotalMeals) || 0,
    };
  }
}
