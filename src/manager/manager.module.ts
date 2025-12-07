import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { MealsService } from './services/meals.service';
import { MealExpenseService } from './services/meal-expense.service';
import { MessService } from './services/mess.service';
import { NoticesService } from './services/notices.service';
import { UtilityCostService } from './services/utility-cost.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MealsEntity,
      MealExpenseIterationsEntity,
      UtilityCostsEntity,
      MembersEntity,
      UsersEntity,
      MessesEntity,
      NoticesEntity
    ]),
  ],
  controllers: [ManagerController],
  providers: [MealsService, MealExpenseService, MessService, NoticesService, UtilityCostService],
})
export class ManagerModule {}
