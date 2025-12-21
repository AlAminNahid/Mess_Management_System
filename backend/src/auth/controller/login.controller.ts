import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { loginDTO } from 'src/dtos/auth/login.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() info: loginDTO) {
    return this.loginService.login(info.email, info.password);
  }
}
