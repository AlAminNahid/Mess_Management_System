import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessStatisticsService } from '../service/messStatistics.service';

@Controller('mess')
export class MessStatisticsController {
  constructor(private readonly messStatisticsService: MessStatisticsService) {}

  @Get('messStatistics')
  @UseGuards(AuthGuard('jwt'))
  getMessStatistics(@Request() req) {
    const userID = req.user.userID;
    return this.messStatisticsService.getMessStatistics(userID);
  }
}
