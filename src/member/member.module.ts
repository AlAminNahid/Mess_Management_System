import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MealsEntity,
      MealExpenseIterationsEntity,
      UtilityCostsEntity,
      MembersEntity,
      UsersEntity,
      MessesEntity,
      NoticesEntity,
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
