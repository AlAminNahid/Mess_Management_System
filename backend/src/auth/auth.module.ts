import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MembersEntity } from 'src/entities/members.entity';
import { LoginController } from './controller/login.controller';
import { RegisterController } from './controller/register.controller';
import { ForgetPasswordController } from './controller/forget-password.controller';
import { ChangePasswordController } from './controller/change-password.controller';
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service';
import { ForgetPasswordService } from './service/forget-password.service';
import { ChangePasswordService } from './service/change-password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, MembersEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'I_AM_ALUBOSS',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginController, RegisterController, ForgetPasswordController, ChangePasswordController],
  providers: [LoginService, RegisterService, ForgetPasswordService, ChangePasswordService, JwtStrategy],
})
export class AuthModule {}
