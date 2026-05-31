import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { CurrentMessMembersService } from '../service/currentMessMembers.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class CurrentMessMembersController {
  constructor(
    private readonly currentMessMembersService: CurrentMessMembersService,
  ) {}

  @Get('currentMessMembers')
  getCurrentMessMembers(@Request() req) {
    const userID = req.user.userID;
    return this.currentMessMembersService.getCurrentMessMembers(userID);
  }
}
