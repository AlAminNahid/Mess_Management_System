import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { LogoutService } from '../service/logout.service';
import { clearAuthCookies } from 'src/utility/cookie.util';

@Controller('auth')
export class LogoutController {
  constructor(
    private readonly logoutService: LogoutService,
    private readonly config: ConfigService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = (req as unknown as { user: { userID: number } }).user;
    await this.logoutService.logout(user.userID);

    clearAuthCookies(res, this.config);

    return { message: 'Logged out successfully' };
  }
}
