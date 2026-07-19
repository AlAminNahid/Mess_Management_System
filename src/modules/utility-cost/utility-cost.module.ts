import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { CurrentMonthUtilityBillsController } from './controller/currentMonthUtilityBills.controller';
import { CurrentMonthUtilityEntriesController } from './controller/currentMonthUtilityEntries.controller';
import { GetUtilityCostsController } from './controller/getUtilityCosts.controller';
import { InsertUtilityCostsController } from './controller/insertUtilityCosts.controller';
import { UpdateUtilityCostsController } from './controller/updateUtilityCosts.controller';
import { CurrentMonthUtilityBillsService } from './service/currentMonthUtilityBills.service';
import { CurrentMonthUtilityEntriesService } from './service/currentMonthUtilityEntries.service';
import { GetUtilityCostsService } from './service/getUtilityCosts.service';
import { InsertUtilityCostsService } from './service/insertUtilityCosts.service';
import { UpdateUtilityCostsService } from './service/updateUtilityCosts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      UtilityCostsEntity,
      MessesEntity,
      MembersEntity,
    ]),
  ],
  controllers: [
    InsertUtilityCostsController,
    GetUtilityCostsController,
    CurrentMonthUtilityBillsController,
    CurrentMonthUtilityEntriesController,
    UpdateUtilityCostsController,
  ],
  providers: [
    InsertUtilityCostsService,
    GetUtilityCostsService,
    CurrentMonthUtilityBillsService,
    CurrentMonthUtilityEntriesService,
    UpdateUtilityCostsService,
  ],
})
export class UtilityCostModule {}
