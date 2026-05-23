import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { CreateMessController } from './controller/createMess.controller';
import { CreateMessService } from './service/createMess.service';
import { JoinMessService } from './service/joinMess.service';
import { JoinMessController } from './controller/joinMess.controller';
import { CurrentMessController } from './controller/currentMess.controller';
import { CurrentMessService } from './service/currentMess.service';
import { TodayTotalMealsController } from './controller/todayTotalMeals.controller';
import { TodayTotalMealsService } from './service/todayTotalMeals.service';
import { MealRateController } from './controller/mealRate.controller';
import { MealRateService } from './service/mealRate.service';
import { MessStatisticsController } from './controller/messStatistics.controller';
import { MessStatisticsService } from './service/messStatistics.service';
import { AllMessesController } from './controller/allMesses.controller';
import { AllMessesService } from './service/allMesses.service';
import { TotalMealExpenseController } from './controller/totalMealExpense.controller';
import { TotalMealExpenseService } from './service/totalMealExpense.service';

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
  controllers: [
    CreateMessController,
    JoinMessController,
    CurrentMessController,
    TodayTotalMealsController,
    MealRateController,
    MessStatisticsController,
    AllMessesController,
    TotalMealExpenseController,
  ],
  providers: [
    CreateMessService,
    JoinMessService,
    CurrentMessService,
    TodayTotalMealsService,
    MealRateService,
    MessStatisticsService,
    AllMessesService,
    TotalMealExpenseService,
  ],
})
export class MessModule {}
