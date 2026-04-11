import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { MembersEntity } from 'src/entities/members.entity';
export declare class AuthService {
    private usersRepository;
    private memberRepository;
    private jwtService;
    constructor(usersRepository: Repository<UsersEntity>, memberRepository: Repository<MembersEntity>, jwtService: JwtService);
    registration(name: string, email: string, password: string, nid: string, phone: string): Promise<UsersEntity>;
    login(email: string, password: string): Promise<{
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
    changePassword(email: string, oldPassword: string, newPassword: string): Promise<UsersEntity>;
    forgetPassword(email: string, newPassword: string, confirmPassword: string): Promise<UsersEntity>;
}
