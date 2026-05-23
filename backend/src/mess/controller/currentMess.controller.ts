import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentMessService } from '../service/currentMess.service';

@Controller('mess')
export class CurrentMessController {
  constructor(private readonly currentMessService: CurrentMessService) {}

  @Get('currentMess')
  @UseGuards(AuthGuard('jwt'))
  getCurrentMess(@Request() req) {
    const userID = req.user.userID;
    return this.currentMessService.getCurrentMess(userID);
  }
}
