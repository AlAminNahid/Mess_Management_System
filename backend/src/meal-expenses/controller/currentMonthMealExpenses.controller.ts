import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { CurrentMonthMealExpensesService } from '../service/currentMonthMealExpenses.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER, UserRole.MEMBER)
@Controller('meal_expenses')
export class CurrentMonthMealExpensesController {
  constructor(
    private readonly currentMonthMealExpensesService: CurrentMonthMealExpensesService,
  ) {}

  @Get('currentMonthMealExpenses')
  getCurrentMonthMealExpenses(@Request() req) {
    return this.currentMonthMealExpensesService.getCurrentMonthMealExpenses(
      req.user.userID,
    );
  }
}
