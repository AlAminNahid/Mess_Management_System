import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MembersEntity } from 'src/entities/members.entity';
import { UsersEntity } from 'src/entities/users.entity';

export async function issueAuthTokens(
  jwtService: JwtService,
  config: ConfigService,
  usersRepository: Repository<UsersEntity>,
  user: UsersEntity,
  member: MembersEntity | null,
): Promise<{ access_token: string; refresh_token: string }> {
  const accessPayload = {
    sub: user.id,
    email: user.email,
    type: 'access',
    ...(member ? { memberID: member.id, role: member.role } : {}),
  };
  const access_token = await jwtService.signAsync(accessPayload);

  const refreshPayload = { sub: user.id, type: 'refresh' };
  const refresh_token = await jwtService.signAsync(refreshPayload, {
    secret: config.get<string>('JWT_REFRESH_SECRET'),
    expiresIn: config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
  } as JwtSignOptions);

  user.hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
  await usersRepository.save(user);

  return { access_token, refresh_token };
}
