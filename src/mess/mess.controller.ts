import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Patch,
  Param,
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

  @Patch('deactivate/member/:memberID')
  deactivateMember(@Param('memberID') memberID: number, @Request() req) {
    const userID = req.user.userID;
    return this.messService.deactivateMember(memberID, userID);
  }

  @Patch('deactivate/mess/:messID')
  deactivateMess(@Param('messID') messID: number, @Request() req) {
    const userID = req.user.userID;
    return this.messService.deactivateMess(messID, userID);
  }
}
