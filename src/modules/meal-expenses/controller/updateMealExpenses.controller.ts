import {
  Body,
  Controller,
  Param,
  Put,
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
import { UpdateMealExpensesService } from '../service/updateMealExpenses.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meal_expenses')
export class UpdateMealExpensesController {
  constructor(
    private readonly updateMealExpensesService: UpdateMealExpensesService,
  ) {}

  @Put('updateMealExpenses/:mealExpensID')
  @UsePipes(new ValidationPipe())
  updateMealExpenses(
    @Param('mealExpensID') mealExpensID: number,
    @Body() info: mealExpenseInsertDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.updateMealExpensesService.updateMealExpenses(
      mealExpensID,
      info.amount,
      info.description,
      info.member_id,
      info.date,
      userID,
    );
  }
}
