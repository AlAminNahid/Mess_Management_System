import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { MessService } from './mess.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessDTO } from 'src/dtos/messes.dto';

@Controller('mess')
export class MessController {
  constructor(private readonly messService: MessService) {}

  @Post('createMess')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createMess(@Body() info: CreateMessDTO, @Request() req) {
    const userID = req.user.userID;
    return this.messService.createMess(info.name, info.address, userID);
  }

  @Post('joinMess')
  @UseGuards(AuthGuard('jwt'))
  joinMess(@Body('messID') messID: number, @Request() req) {
    const userID = req.user.userID;
    return this.messService.joinMess(messID, userID);
  }

  @Get('allMesss')
  @UseGuards(AuthGuard('jwt'))
  getAllMesses(@Request() req) {
    const userID = req.user.userID;
    return this.messService.getAllMesses(userID);
  }

  @Get('totalMeals')
  @UseGuards(AuthGuard('jwt'))
  getTotalMeals(@Request() req) {
    const userID = req.user.userID;
    return this.messService.getTotalMeals(userID);
  }

  @Get('totalMealExpense')
  @UseGuards(AuthGuard('jwt'))
  gettotalMealExpense(@Request() req) {
    const userID = req.user.userID;
    return this.messService.gettotalMealExpense(userID);
  }
}
