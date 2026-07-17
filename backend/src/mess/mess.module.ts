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
import { CurrentMessMembersController } from './controller/currentMessMembers.controller';
import { CurrentMessMembersService } from './service/currentMessMembers.service';
import { MonthlySheetController } from './controller/monthlySheet.controller';
import { MonthlySheetService } from './service/monthlySheet.service';
import { MessPasswordController } from './controller/messPassword.controller';
import { MessPasswordService } from './service/messPassword.service';

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
    CurrentMessMembersController,
    MonthlySheetController,
    MessPasswordController,
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
    CurrentMessMembersService,
    MonthlySheetService,
    MessPasswordService,
  ],
})
export class MessModule {}
