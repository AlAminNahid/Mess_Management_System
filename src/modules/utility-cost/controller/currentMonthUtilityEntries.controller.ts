import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { CurrentMonthUtilityEntriesService } from '../service/currentMonthUtilityEntries.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('utility_cost')
export class CurrentMonthUtilityEntriesController {
  constructor(
    private readonly currentMonthUtilityEntriesService: CurrentMonthUtilityEntriesService,
  ) {}

  @Get('currentMonthUtilityEntries/:messID')
  getCurrentMonthUtilityEntries(
    @Param('messID') messID: number,
    @Request() req,
  ) {
    return this.currentMonthUtilityEntriesService.getCurrentMonthUtilityEntries(
      messID,
      req.user.userID,
    );
  }
}
