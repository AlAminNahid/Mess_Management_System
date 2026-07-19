import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MealRateService } from '../service/mealRate.service';

@Controller('mess')
export class MealRateController {
  constructor(private readonly mealRateService: MealRateService) {}

  @Get('mealRate')
  @UseGuards(AuthGuard('jwt'))
  getMealRate(@Request() req) {
    const userID = req.user.userID;
    return this.mealRateService.getMealRate(userID);
  }
}
