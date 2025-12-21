import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Put,
  Param,
} from '@nestjs/common';
import { MealsService } from '../services/meals.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/auth/role.enum';
import { mealInsertDTO } from 'src/dtos/meal_insert.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Post('insertMeals')
  @UsePipes(new ValidationPipe())
  insertMeals(@Body() info: mealInsertDTO, @Request() req) {
    const userID = req.user.userID;
    return this.mealService.insertMeals(
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
    return this.mealService.updateMeals(
      mealID,
      info.meal_count,
      info.member_id,
      userID,
    );
  }
}
