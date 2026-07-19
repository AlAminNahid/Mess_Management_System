import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { AuthModule } from './modules/auth/auth.module';
import { MessModule } from './modules/mess/mess.module';
import { SharedModule } from './modules/shared/shared.module';
import { UtilityCostModule } from './modules/utility-cost/utility-cost.module';
import { MealsModule } from './modules/meals/meals.module';
import { MealExpensesModule } from './modules/meal-expenses/meal-expenses.module';
import { NoticesModule } from './modules/notices/notices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    AuthModule,
    MessModule,
    SharedModule,
    UtilityCostModule,
    MealsModule,
    MealExpensesModule,
    NoticesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
