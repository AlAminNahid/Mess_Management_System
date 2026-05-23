import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoinMessService } from '../service/joinMess.service';

@Controller('mess')
export class JoinMessController {
  constructor(private readonly joinMessService: JoinMessService) {}

  @Post('joinMess')
  @UseGuards(AuthGuard('jwt'))
  joinMess(@Body('messID') messID: number, @Request() req) {
    const userID = req.user.userID;
    return this.joinMessService.joinMess(messID, userID);
  }
}
