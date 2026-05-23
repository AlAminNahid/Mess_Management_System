import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { CurrentMonthUtilityBillsService } from '../service/currentMonthUtilityBills.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('utility_cost')
export class CurrentMonthUtilityBillsController {
  constructor(
    private readonly currentMonthUtilityBillsService: CurrentMonthUtilityBillsService,
  ) {}

  @Get('currentMonthUtilityBills/:messID')
  getCurrentMonthUtilityBills(@Param('messID') messID: number) {
    return this.currentMonthUtilityBillsService.getCurrentMonthUtilityBills(
      messID,
    );
  }
}
