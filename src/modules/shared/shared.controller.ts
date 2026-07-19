import {
  Body,
  Get,
  Controller,
  Patch,
  UseGuards,
  Param,
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

  @Get('userById/:userID')
  getUserById(@Param('userID') userID: string) {
    return this.sharedService.getUserById(userID);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER, UserRole.USER)
  @Patch('userProfile')
  @UsePipes(new ValidationPipe())
  updateUserProfile(@Body() info: UserProfileUpdateDTO, @Request() req) {
    const userID = req.user.userID;
    return this.sharedService.updateUserProfile(userID, info.name, info.phone);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER)
  @Get('messByUserID/:userID')
  getMessByUserID(@Param('userID') userID: string) {
    return this.sharedService.getMessByUserID(userID);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER)
  @Get('usersMeals/:userID')
  getUserMeals(@Param('userID') userID: string) {
    return this.sharedService.getUserMeals(userID);
  }

  @Roles(UserRole.MANAGER, UserRole.MEMBER)
  @Get('userMoneySubmit/:userID')
  getUserMoneySubmit(@Param('userID') userID: string) {
    return this.sharedService.getUserMoneySubmit(userID);
  }
}
