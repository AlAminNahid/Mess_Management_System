import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { utilityCostDTO } from 'src/dtos/utility_cost.dto';
import { UpdateUtilityCostsService } from '../service/updateUtilityCosts.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('utility_cost')
export class UpdateUtilityCostsController {
  constructor(
    private readonly updateUtilityCostsService: UpdateUtilityCostsService,
  ) {}

  @Put('updateUtilityCosts/:utilityCostID')
  @UsePipes(new ValidationPipe())
  updateUtilityCosts(
    @Param('utilityCostID') utilityCostID: number,
    @Body() info: utilityCostDTO,
    @Request() req,
  ) {
    const userID = req.user.userID;
    return this.updateUtilityCostsService.updateUtilityCosts(
      utilityCostID,
      info.mess_id,
      info.electricity,
      info.internet,
      info.gas,
      info.maid,
      userID,
    );
  }
}
