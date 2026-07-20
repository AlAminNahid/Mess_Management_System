import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { MealQueryDTO } from 'src/dtos/meal_query.dto';
import { UserRole } from 'src/dtos/auth/role.enum';
import { MonthlySheetService } from '../service/monthlySheet.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class MonthlySheetController {
  constructor(private readonly monthlySheetService: MonthlySheetService) {}

  @Get('monthlySheet')
  @UsePipes(new ValidationPipe())
  getMonthlySheet(@Query() query: MealQueryDTO, @Request() req) {
    return this.monthlySheetService.getMonthlySheet(
      req.user.userID,
      query.period ?? 'current',
    );
  }
}
