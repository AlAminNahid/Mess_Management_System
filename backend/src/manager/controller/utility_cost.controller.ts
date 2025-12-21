import {
  Body,
  Controller,
  Post,
  Put,
  ValidationPipe,
  Request,
  Param,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UtilityCostService } from '../services/utility-cost.service';
import { utilityCostDTO } from 'src/dtos/utility_cost.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/auth/role.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('utility_cost')
export class UtilityCostController {
  constructor(private readonly utilityCostService: UtilityCostService) {}

  @Post('insertUtiltyCosts')
  @UsePipes(new ValidationPipe())
  insertUtiltyCosts(@Body() info: utilityCostDTO, @Request() req) {
    const userID = req.user.userID;
    return this.utilityCostService.insertUtiltyCosts(
      info.mess_id,
      info.rent,
      info.electricity,
      info.internet,
      info.gas,
      info.maid,
      userID,
    );
  }

  @Put('updateUtilityCosts/:utilityCostID')
  @UsePipes(new ValidationPipe())
  updateUtilityCosts(
    @Param('utilityCostID') utilityCostID: number,
    @Body() info: utilityCostDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.utilityCostService.updateUtilityCosts(
      utilityCostID,
      info.mess_id,
      info.rent,
      info.electricity,
      info.internet,
      info.gas,
      info.maid,
      userID,
    );
  }
}
