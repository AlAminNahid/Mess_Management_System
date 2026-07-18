import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { GetUtilityCostsService } from '../service/getUtilityCosts.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('utility_cost')
export class GetUtilityCostsController {
  constructor(
    private readonly getUtilityCostsService: GetUtilityCostsService,
  ) {}

  @Get('getUtilityCosts/:messID')
  getUtilityCosts(@Param('messID') messID: number, @Request() req) {
    return this.getUtilityCostsService.getUtilityCosts(messID, req.user.userID);
  }
}
