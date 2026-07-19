import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { RefreshService } from '../service/refresh.service';
import { setAuthCookies } from 'src/utility/cookie.util';

@Controller('auth')
export class RefreshController {
  constructor(
    private readonly refreshService: RefreshService,
    private readonly config: ConfigService,
  ) {}

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } = await this.refreshService.refresh(
      req.cookies?.refresh_token,
    );

    setAuthCookies(res, this.config, access_token, refresh_token);

    return { message: 'Token refreshed' };
  }
}
