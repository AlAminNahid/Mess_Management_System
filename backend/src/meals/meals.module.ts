import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { InsertMealsController } from './controller/insertMeals.controller';
import { UpdateMealsController } from './controller/updateMeals.controller';
import { InsertMealsService } from './service/insertMeals.service';
import { UpdateMealsService } from './service/updateMeals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, MembersEntity, MealsEntity]),
  ],
  controllers: [InsertMealsController, UpdateMealsController],
  providers: [InsertMealsService, UpdateMealsService],
})
export class MealsModule {}
