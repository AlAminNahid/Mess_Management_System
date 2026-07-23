import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PendingInviteService } from '../service/pendingInvite.service';

@UseGuards(AuthGuard('jwt'))
@Controller('mess')
export class PendingInviteController {
  constructor(private readonly pendingInviteService: PendingInviteService) {}

  @Get('pendingInvite')
  pendingInvite(@Request() req) {
    return this.pendingInviteService.getPendingInvite(req.user.userID);
  }
}
