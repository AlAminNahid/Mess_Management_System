import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { InsertMealExpensesController } from './controller/insertMealExpenses.controller';
import { CurrentMonthMealExpensesController } from './controller/currentMonthMealExpenses.controller';
import { UpdateMealExpensesController } from './controller/updateMealExpenses.controller';
import { CurrentMonthMealExpensesService } from './service/currentMonthMealExpenses.service';
import { InsertMealExpensesService } from './service/insertMealExpenses.service';
import { UpdateMealExpensesService } from './service/updateMealExpenses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MembersEntity,
      UsersEntity,
      MealExpenseIterationsEntity,
    ]),
  ],
  controllers: [
    InsertMealExpensesController,
    CurrentMonthMealExpensesController,
    UpdateMealExpensesController,
  ],
  providers: [
    InsertMealExpensesService,
    CurrentMonthMealExpensesService,
    UpdateMealExpensesService,
  ],
})
export class MealExpensesModule {}
