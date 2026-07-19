import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { GetNoticesService } from '../service/getNotices.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller()
export class GetNoticesController {
  constructor(private readonly getNoticesService: GetNoticesService) {}

  @Get('getNotices/:messID')
  getNotices(@Param('messID') messID: number, @Request() req) {
    const userID = req.user.userID;
    return this.getNoticesService.getNotices(messID, userID);
  }
}
