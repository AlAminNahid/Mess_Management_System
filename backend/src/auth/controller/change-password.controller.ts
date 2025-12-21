import {
  Body,
  Controller,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangePasswordService } from '../service/change-password.service';
import { AuthGuard } from '@nestjs/passport';
import { changePasswordDTO } from 'src/dtos/auth/changePassword.dto';
import { UsersEntity } from 'src/entities/users.entity';

@Controller('auth')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Patch('change-password')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  changePassword(@Body() info: changePasswordDTO): Promise<UsersEntity> {
    return this.changePasswordService.changePassword(
      info.email,
      info.oldPassword,
      info.newPassword,
    );
  }
}
