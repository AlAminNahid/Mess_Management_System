import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { utilityCostDTO } from 'src/dtos/utility_cost.dto';
import { InsertUtilityCostsService } from '../service/insertUtilityCosts.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('utility_cost')
export class InsertUtilityCostsController {
  constructor(
    private readonly insertUtilityCostsService: InsertUtilityCostsService,
  ) {}

  @Post('insertUtiltyCosts')
  @UsePipes(new ValidationPipe())
  insertUtiltyCosts(@Body() info: utilityCostDTO, @Request() req) {
    const userID = req.user.userID;
    return this.insertUtilityCostsService.insertUtiltyCosts(
      info.mess_id,
      info.electricity,
      info.internet,
      info.gas,
      info.maid,
      userID,
    );
  }
}
