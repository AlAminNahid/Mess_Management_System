import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TotalMealExpenseService } from '../service/totalMealExpense.service';

@Controller('mess')
export class TotalMealExpenseController {
  constructor(
    private readonly totalMealExpenseService: TotalMealExpenseService,
  ) {}

  @Get('totalMealExpense')
  @UseGuards(AuthGuard('jwt'))
  getTotalMealExpense(@Request() req) {
    const userID = req.user.userID;
    return this.totalMealExpenseService.getTotalMealExpense(userID);
  }
}
