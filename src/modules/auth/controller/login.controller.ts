import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { LoginService } from '../service/login.service';
import { loginDTO } from 'src/dtos/auth/login.dto';
import type { Response } from 'express';
import { setAuthCookies } from 'src/utility/cookie.util';

@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UsePipes(new ValidationPipe())
  async login(
    @Body() info: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginData = await this.loginService.login(info.email, info.password);

    setAuthCookies(
      res,
      this.config,
      loginData.access_token,
      loginData.refresh_token,
    );

    const { access_token, refresh_token, ...userData } = loginData;
    return userData;
  }
}
