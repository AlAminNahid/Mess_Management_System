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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { mealInsertDTO } from 'src/dtos/meal_insert.dto';
import { InsertMealsService } from '../service/insertMeals.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meals')
export class InsertMealsController {
  constructor(private readonly insertMealsService: InsertMealsService) {}

  @Post('insertMeals')
  @UsePipes(new ValidationPipe())
  insertMeals(@Body() info: mealInsertDTO, @Request() req) {
    const userID = req.user.userID;
    return this.insertMealsService.insertMeals(
      info.meal_count,
      info.member_id,
      info.meal_type,
      info.date,
      userID,
    );
  }
}
