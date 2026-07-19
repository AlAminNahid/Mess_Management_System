import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { CurrentMonthUtilityBillsService } from '../service/currentMonthUtilityBills.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER, UserRole.MEMBER)
@Controller('utility_cost')
export class CurrentMonthUtilityBillsController {
  constructor(
    private readonly currentMonthUtilityBillsService: CurrentMonthUtilityBillsService,
  ) {}

  @Get('currentMonthUtilityBills/:messID')
  getCurrentMonthUtilityBills(@Param('messID') messID: number, @Request() req) {
    return this.currentMonthUtilityBillsService.getCurrentMonthUtilityBills(
      messID,
      req.user.userID,
    );
  }
}
