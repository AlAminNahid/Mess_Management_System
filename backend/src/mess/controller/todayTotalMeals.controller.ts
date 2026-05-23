import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { TodayTotalMealsService } from '../service/todayTotalMeals.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mess')
export class TodayTotalMealsController {
  constructor(
    private readonly todaysTotalMealsService: TodayTotalMealsService,
  ) {}

  @Get('todayTotalMeals')
  @UseGuards(AuthGuard('jwt'))
  getTodayTotalMeals(@Request() req) {
    const userID = req.user.userID;
    return this.todaysTotalMealsService.getTodayTotalMeals(userID);
  }
}
