import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class MessService {
    private usersRepository;
    private memberRepository;
    private messRepository;
    constructor(usersRepository: Repository<UsersEntity>, memberRepository: Repository<MembersEntity>, messRepository: Repository<MessesEntity>);
    createMess(name: string, address: string, userID: number): Promise<{
        message: string;
        'mess & member info': {
            id: number;
            user_name: string;
            user_email: string;
            user_phone: string;
            role: string;
            mess_name: string;
            mess_address: string;
        };
    }>;
    joinMess(messID: number, userID: number): Promise<{
        message: string;
        'mess & member info': {
            id: number;
            member_name: string;
            member_email: string;
            member_phone: string;
            member_role: string;
            mess_name: string;
            mess_address: string;
        };
    }>;
}
