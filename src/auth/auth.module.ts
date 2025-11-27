import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entitie/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports : [TypeOrmModule.forFeature([UsersEntity]), PassportModule, JwtModule.register({
        secret : 'I_AM_ALUBOSS',
        signOptions : { expiresIn : '1h'}
    })],
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy]
})
export class AuthModule {}
