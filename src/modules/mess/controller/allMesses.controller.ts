import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { AllMessesService } from '../service/allMesses.service';

@Controller('mess')
export class AllMessesController {
  constructor(private readonly allMessesService: AllMessesService) {}

  @Get('allMesses')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  getAllMesses(@Query() query: PaginationDTO, @Request() req) {
    const userID = req.user.userID;
    return this.allMessesService.getAllMesses(
      userID,
      query.page ?? 1,
      query.limit ?? 50,
    );
  }
}
