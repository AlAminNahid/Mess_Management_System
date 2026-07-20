import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { dataSourceOptions } from './data-source';
import { AuthModule } from './modules/auth/auth.module';
import { MessModule } from './modules/mess/mess.module';
import { SharedModule } from './modules/shared/shared.module';
import { UtilityCostModule } from './modules/utility-cost/utility-cost.module';
import { MealsModule } from './modules/meals/meals.module';
import { MealExpensesModule } from './modules/meal-expenses/meal-expenses.module';
import { NoticesModule } from './modules/notices/notices.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    AuthModule,
    MessModule,
    SharedModule,
    UtilityCostModule,
    MealsModule,
    MealExpensesModule,
    NoticesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
