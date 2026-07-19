import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

function parseDurationMs(duration: string): number {
  const match = /^(\d+)(s|m|h|d)$/.exec(duration);
  if (!match) {
    throw new Error(`Invalid duration: ${duration}`);
  }
  const value = Number(match[1]);
  const unitMs: Record<string, number> = {
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };
  return value * unitMs[match[2]];
}

export function setAuthCookies(
  res: Response,
  config: ConfigService,
  accessToken: string,
  refreshToken: string,
) {
  const secure = config.get<string>('NODE_ENV') === 'production';
  const accessExpiresIn = config.get<string>('JWT_ACCESS_EXPIRES_IN', '15m');
  const refreshExpiresIn = config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d');

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + parseDurationMs(accessExpiresIn)),
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/auth',
    expires: new Date(Date.now() + parseDurationMs(refreshExpiresIn)),
  });
}

export function clearAuthCookies(res: Response, config: ConfigService) {
  const secure = config.get<string>('NODE_ENV') === 'production';

  res.cookie('access_token', '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });

  res.cookie('refresh_token', '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/auth',
    expires: new Date(0),
  });
}
