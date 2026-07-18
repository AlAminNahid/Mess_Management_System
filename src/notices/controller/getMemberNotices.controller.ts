import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { GetMemberNoticesService } from '../service/getMemberNotices.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MEMBER)
@Controller('member')
export class GetMemberNoticesController {
  constructor(
    private readonly getMemberNoticesService: GetMemberNoticesService,
  ) {}

  @Get('getNotices/:messID')
  getNotices(@Param('messID') messID: number, @Request() req) {
    const userID = req.user.userID;
    return this.getMemberNoticesService.getNotices(messID, userID);
  }
}
