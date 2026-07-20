import {
  Body,
  Get,
  Controller,
  Patch,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { UserProfileUpdateDTO } from 'src/dtos/user_profile_update.dto';
import { SharedService } from './shared.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @Roles(UserRole.MANAGER, UserRole.MEMBER, UserRole.USER)
  @Get('userById')
  getUserById(@Request() req) {
    return this.sharedService.getUserById(req.user.userID);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER, UserRole.USER)
  @Patch('userProfile')
  @UsePipes(new ValidationPipe())
  updateUserProfile(@Body() info: UserProfileUpdateDTO, @Request() req) {
    const userID = req.user.userID;
    return this.sharedService.updateUserProfile(userID, info.name, info.phone);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER)
  @Get('messByUserID')
  getMessByUserID(@Request() req) {
    return this.sharedService.getMessByUserID(req.user.userID);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER)
  @Get('usersMeals')
  getUserMeals(@Request() req) {
    return this.sharedService.getUserMeals(req.user.userID);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER)
  @Get('userMoneySubmit')
  getUserMoneySubmit(@Request() req) {
    return this.sharedService.getUserMoneySubmit(req.user.userID);
  }
}
