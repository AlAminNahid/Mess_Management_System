import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from './data-source';
import { AuthModule } from './auth/auth.module';
import { MessModule } from './mess/mess.module';
import { SharedModule } from './shared/shared.module';
import { UtilityModule } from './utility/utility.module';
import { MealsModule } from './meals/meals.module';
import { MealExpensesModule } from './meal-expenses/meal-expenses.module';
import { NoticesModule } from './notices/notices.module';

const db = new DataSource();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: db.type,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      autoLoadEntities: true,
      synchronize: true,
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
