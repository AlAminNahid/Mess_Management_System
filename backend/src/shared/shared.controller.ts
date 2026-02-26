import { Get, Controller, UseGuards, Param, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { SharedService } from './shared.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER, UserRole.MEMBER)
@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @Get('userById/:userID')
  getUserById(@Param('userID') userID: string) {
    return this.sharedService.getUserById(userID);
  }
}
