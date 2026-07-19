import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { AuthModule } from './auth/auth.module';
import { MessModule } from './mess/mess.module';
import { SharedModule } from './shared/shared.module';
import { UtilityModule } from './utility/utility.module';
import { MealsModule } from './meals/meals.module';
import { MealExpensesModule } from './meal-expenses/meal-expenses.module';
import { NoticesModule } from './notices/notices.module';

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
    UtilityModule,
    MealsModule,
    MealExpensesModule,
    NoticesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
