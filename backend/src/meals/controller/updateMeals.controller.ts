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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { mealInsertDTO } from 'src/dtos/meal_insert.dto';
import { UpdateMealsService } from '../service/updateMeals.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('meals')
export class UpdateMealsController {
  constructor(private readonly updateMealsService: UpdateMealsService) {}

  @Put('updateMeals/:mealID')
  @UsePipes(new ValidationPipe())
  updateMeals(
    @Param('mealID') mealID: number,
    @Body() info: mealInsertDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.updateMealsService.updateMeals(
      mealID,
      info.meal_count,
      info.member_id,
      info.meal_type,
      info.date,
      userID,
    );
  }
}
