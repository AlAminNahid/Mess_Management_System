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
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { ManagerService } from './manager.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/role.enum';
import { mealInsertDTO } from 'src/dtos/meal_insert.dto';
import { mealExpenseInsertDTO } from 'src/dtos/meal_expense_insert.dto';
import { utilityCostDTO } from 'src/dtos/utility_cost.dto';
import { NoticeDTO } from 'src/dtos/notice.dto';

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

  @Post('insertUtiltyCosts')
  @UsePipes(new ValidationPipe())
  insertUtiltyCosts(@Body() info: utilityCostDTO, @Request() req) {
    const userID = req.user.userID;
    return this.managerService.insertUtiltyCosts(
      info.mess_id,
      info.rent,
      info.electricity,
      info.internet,
      info.gas,
      info.maid,
      userID,
    );
  }

  @Put('updateUtilityCosts/:utilityCostID')
  @UsePipes(new ValidationPipe())
  updateUtilityCosts(
    @Param('utilityCostID') utilityCostID: number,
    @Body() info: utilityCostDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.managerService.updateUtilityCosts(
      utilityCostID,
      info.mess_id,
      info.rent,
      info.electricity,
      info.internet,
      info.gas,
      info.maid,
      userID,
    );
  }

  @Post('sendNotice')
  @UsePipes(new ValidationPipe())
  sendNotice(@Body() info: NoticeDTO, @Request() req) {
    const userID = req.user.userID;
    return this.managerService.sendNotice(
      info.title,
      info.description,
      info.notice_type,
      userID,
    );
  }

  @Get('getNotices/:messID')
  getNotices(
    @Param('messID') messID : number,
    @Request() req
  ) {
    const userID = req.user.userID;
    return this.managerService.getNotices(messID, userID);
  }

  @Patch('deactivate/member/:memberID')
  deactivateMember(
    @Param('memberID') memberID : number,
    @Request() req
  ) {
    const userID = req.user.userID;
    return this.managerService.deactivateMember(memberID, userID);
  }

  @Patch('deactivate/mess/:messID')
  deactivateMess(
    @Param('messID') messID : number,
    @Request() req
  ) {
    const userID = req.user.userID;
    return this.managerService.deactivateMess(messID, userID);
  }
}
