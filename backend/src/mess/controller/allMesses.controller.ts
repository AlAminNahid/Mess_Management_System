import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllMessesService } from '../service/allMesses.service';

@Controller('mess')
export class AllMessesController {
  constructor(private readonly allMessesService: AllMessesService) {}

  @Get('allMesses')
  @UseGuards(AuthGuard('jwt'))
  getAllMesses(@Request() req) {
    const userID = req.user.userID;
    return this.allMessesService.getAllMesses(userID);
  }
}
