import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { loginDTO } from 'src/dtos/auth/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() info: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginData = await this.loginService.login(info.email, info.password);

    res.cookie('access_token', loginData.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });

    const { access_token, ...userData } = loginData;
    return userData;
  }
}
