import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoinMessService } from '../service/joinMess.service';
import { JoinMessDTO } from 'src/dtos/messes.dto';

@Controller('mess')
export class JoinMessController {
  constructor(private readonly joinMessService: JoinMessService) {}

  @Post('joinMess')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  joinMess(@Body() info: JoinMessDTO, @Request() req) {
    const userID = req.user.userID;
    return this.joinMessService.joinMess(info.name, info.password, userID);
  }
}
