import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { CurrentMonthMealsService } from '../service/currentMonthMeals.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meals')
export class CurrentMonthMealsController {
  constructor(
    private readonly currentMonthMealsService: CurrentMonthMealsService,
  ) {}

  @Get('currentMonthMeals')
  getCurrentMonthMeals(@Request() req) {
    return this.currentMonthMealsService.getCurrentMonthMeals(req.user.userID);
  }
}
