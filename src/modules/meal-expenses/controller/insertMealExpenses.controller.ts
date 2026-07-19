import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { mealExpenseInsertDTO } from 'src/dtos/meal_expense_insert.dto';
import { InsertMealExpensesService } from '../service/insertMealExpenses.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meal_expenses')
export class InsertMealExpensesController {
  constructor(
    private readonly insertMealExpensesService: InsertMealExpensesService,
  ) {}

  @Post('insertMealExpenses')
  @UsePipes(new ValidationPipe())
  insertMealExpenses(@Body() info: mealExpenseInsertDTO, @Request() req) {
    const userID = req.user.userID;
    return this.insertMealExpensesService.insertMealExpenses(
      info.amount,
      info.description,
      info.member_id,
      info.date,
      userID,
    );
  }
}
