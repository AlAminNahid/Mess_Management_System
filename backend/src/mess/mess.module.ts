import { Module } from '@nestjs/common';
import { MessController } from './mess.controller';
import { MessService } from './mess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      MessesEntity,
      MembersEntity,
      MealsEntity,
      MealExpenseIterationsEntity,
    ]),
  ],
  controllers: [MessController],
  providers: [MessService],
})
export class MessModule {}
