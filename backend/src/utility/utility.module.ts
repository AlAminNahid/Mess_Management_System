import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { CurrentMonthUtilityBillsController } from './controller/currentMonthUtilityBills.controller';
import { GetUtilityCostsController } from './controller/getUtilityCosts.controller';
import { InsertUtilityCostsController } from './controller/insertUtilityCosts.controller';
import { UpdateUtilityCostsController } from './controller/updateUtilityCosts.controller';
import { CurrentMonthUtilityBillsService } from './service/currentMonthUtilityBills.service';
import { GetUtilityCostsService } from './service/getUtilityCosts.service';
import { InsertUtilityCostsService } from './service/insertUtilityCosts.service';
import { UpdateUtilityCostsService } from './service/updateUtilityCosts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UtilityCostsEntity, MessesEntity]),
  ],
  controllers: [
    InsertUtilityCostsController,
    GetUtilityCostsController,
    CurrentMonthUtilityBillsController,
    UpdateUtilityCostsController,
  ],
  providers: [
    InsertUtilityCostsService,
    GetUtilityCostsService,
    CurrentMonthUtilityBillsService,
    UpdateUtilityCostsService,
  ],
})
export class UtilityModule {}
