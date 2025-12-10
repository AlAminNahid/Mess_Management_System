import { Body, Controller, Post, UsePipes, ValidationPipe, Request, Put, Param, UseGuards } from '@nestjs/common';
import { MealExpenseService } from '../services/meal-expense.service';
import { mealExpenseInsertDTO } from 'src/dtos/meal_expense_insert.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/auth/role.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meal_expenses')
export class MealExpenseController {
  constructor(private readonly mealExpenseService: MealExpenseService) {}

  @Post('insertMealExpenses')
  @UsePipes(new ValidationPipe())
  insertMealExpenses(@Body() info: mealExpenseInsertDTO, @Request() req) {
    const userID = req.user.userID;
    return this.mealExpenseService.insertMealExpenses(
      info.amount,
      info.description,
      info.member_id,
      userID,
    );
  }

  @Put('updateMealExpenses/:mealExpensID')
  @UsePipes(new ValidationPipe())
  updateMealExpenses(
    @Param('mealExpensID') mealExpensID: number,
    @Body() info: mealExpenseInsertDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.mealExpenseService.updateMealExpenses(
      mealExpensID,
      info.amount,
      info.description,
      info.member_id,
      userID,
    );
  }
}
