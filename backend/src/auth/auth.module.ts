import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MembersEntity } from 'src/entities/members.entity';
import { LoginController } from './controller/login.controller';
import { RegisterController } from './controller/register.controller';
import { ForgetPasswordController } from './controller/forget-password.controller';
import { ChangePasswordController } from './controller/change-password.controller';
import { RefreshController } from './controller/refresh.controller';
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service';
import { ForgetPasswordService } from './service/forget-password.service';
import { ChangePasswordService } from './service/change-password.service';
import { RefreshService } from './service/refresh.service';
import { LogoutController } from './controller/logout.controller';
import { LogoutService } from './service/logout.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, MembersEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
        } as JwtSignOptions,
      }),
    }),
  ],
  controllers: [
    LoginController,
    RegisterController,
    ForgetPasswordController,
    ChangePasswordController,
    RefreshController,
    LogoutController,
  ],
  providers: [
    LoginService,
    RegisterService,
    ForgetPasswordService,
    ChangePasswordService,
    RefreshService,
    LogoutService,
    JwtStrategy,
  ],
})
export class AuthModule {}
