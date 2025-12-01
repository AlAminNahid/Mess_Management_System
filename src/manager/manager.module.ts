import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';

@Module({
  imports : [TypeOrmModule.forFeature([MealsEntity, MealExpenseIterationsEntity, UtilityCostsEntity, MembersEntity, UsersEntity])],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}
