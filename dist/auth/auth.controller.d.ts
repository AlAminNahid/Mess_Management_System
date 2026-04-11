import { AuthService } from './auth.service';
import { registrationDTO } from 'src/dtos/registration.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { loginDTO } from 'src/dtos/login.dto';
import { changePasswordDTO } from 'src/dtos/changePassword.dto';
import { forgetPasswordDTO } from 'src/dtos/forgetPassword.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registration(info: registrationDTO): Promise<UsersEntity>;
    login(info: loginDTO): Promise<{
        access_token: string;
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
        member?: undefined;
    } | {
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
        member: {
            id: number;
            role: string;
            is_active: true;
            mess_id: number;
            join_date: import("typeorm").Timestamp;
        };
        message?: undefined;
    }>;
    changePassword(info: changePasswordDTO): Promise<UsersEntity>;
    forgetPassword(info: forgetPasswordDTO): Promise<UsersEntity>;
}
