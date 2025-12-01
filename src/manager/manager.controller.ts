import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { ManagerService } from './manager.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/role.enum';
import { mealInsertDTO } from 'src/dtos/meal_insert.dto';
import { mealExpenseInsertDTO } from 'src/dtos/meal_expense_insert.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('dashboard')
  getManagerDashboard(): string {
    return this.managerService.getManagerDashboard();
  }

  @Post('insertMeals')
  @UsePipes(new ValidationPipe())
  insertMeals(@Body() info: mealInsertDTO, @Request() req) {
    const userID = req.user.userID;
    return this.managerService.insertMeals(
      info.meal_count,
      info.member_id,
      userID,
    );
  }

  @Put('updateMeals/:mealID')
  @UsePipes(new ValidationPipe())
  updateMeals(
    @Param('mealID') mealID: number,
    @Body() info: mealInsertDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.managerService.updateMeals(
      mealID,
      info.meal_count,
      info.member_id,
      userID,
    );
  }

  @Post('insertMealExpenses')
  @UsePipes(new ValidationPipe())
  insertMealExpenses(@Body() info: mealExpenseInsertDTO, @Request() req) {
    const userID = req.user.userID;
    return this.managerService.insertMealExpenses(
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
    return this.managerService.updateMealExpenses(
      mealExpensID,
      info.amount,
      info.description,
      info.member_id,
      userID,
    );
  }
}
