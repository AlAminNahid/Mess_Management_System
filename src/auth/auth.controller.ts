import { Body, Controller, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registrationDTO } from 'src/dtos/registration.dto';
import { UsersEntity } from 'src/entitie/users.entity';
import { loginDTO } from 'src/dtos/login.dto';
import { changePasswordDTO } from 'src/dtos/changePassword.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
    
    @Post('registration')
    @UsePipes(new ValidationPipe())
    registration(
        @Body() info : registrationDTO
    ) : Promise<UsersEntity>{
        return this.authService.registration(info.name, info.email, info.password, info.nid, info.phone);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(
        @Body() info : loginDTO
    ) : Promise<UsersEntity> {
        return this.authService.login(info.email, info.password);
    }

    @Patch('changePassword')
    @UsePipes(new ValidationPipe())
    changePassword(
        @Body() info : changePasswordDTO
    ) : Promise<UsersEntity> {
        return this.authService.changePassword(info.email, info.oldPassword, info.newPassword);
    }
}
