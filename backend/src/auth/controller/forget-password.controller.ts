import { Body, Controller, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ForgetPasswordService } from '../service/forget-password.service';
import { forgetPasswordDTO } from 'src/dtos/auth/forgetPassword.dto';
import { UsersEntity } from 'src/entities/users.entity';

@Controller('auth')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Patch('forget-password')
  @UsePipes(new ValidationPipe())
  forgetPassword(@Body() info: forgetPasswordDTO): Promise<UsersEntity> {
    return this.forgetPasswordService.forgetPassword(
      info.email,
      info.newPassword,
      info.confirmPassword,
    );
  }
}
