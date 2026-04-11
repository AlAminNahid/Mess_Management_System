import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      MembersEntity,
      MealsEntity,
      MealExpenseIterationsEntity,
    ]),
  ],
  controllers: [SharedController],
  providers: [SharedService],
})
export class SharedModule {}
