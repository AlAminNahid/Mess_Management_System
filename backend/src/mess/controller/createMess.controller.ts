import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { CreateMessService } from '../service/createMess.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessDTO } from 'src/dtos/messes.dto';

@Controller('mess')
export class CreateMessController {
  constructor(private readonly createMessService: CreateMessService) {}

  @Post('createMess')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createMess(@Body() info: CreateMessDTO, @Request() req) {
    const userID = req.user.userID;
    return this.createMessService.createMess(info.name, info.address, userID);
  }
}
