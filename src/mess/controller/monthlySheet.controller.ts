import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { MonthlySheetService } from '../service/monthlySheet.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class MonthlySheetController {
  constructor(private readonly monthlySheetService: MonthlySheetService) {}

  @Get('monthlySheet')
  getMonthlySheet(@Request() req) {
    return this.monthlySheetService.getMonthlySheet(req.user.userID);
  }
}
