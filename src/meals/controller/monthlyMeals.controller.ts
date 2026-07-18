import { Controller, Get, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { MealQueryDTO } from 'src/dtos/meal_query.dto';
import { UserRole } from 'src/dtos/auth/role.enum';
import { MonthlyMealsService } from '../service/monthlyMeals.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER, UserRole.MEMBER)
@Controller('meals')
export class MonthlyMealsController {
  constructor(private readonly monthlyMealsService: MonthlyMealsService) {}

  @Get('monthlyMeals')
  @UsePipes(new ValidationPipe())
  getMonthlyMeals(@Query() query: MealQueryDTO, @Request() req) {
    return this.monthlyMealsService.getMonthlyMeals(
      req.user.userID,
      query.period ?? 'current',
    );
  }
}
