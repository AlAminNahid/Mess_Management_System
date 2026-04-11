import { MessService } from './mess.service';
import { CreateMessDTO } from 'src/dtos/messes.dto';
export declare class MessController {
    private readonly messService;
    constructor(messService: MessService);
    createMess(info: CreateMessDTO, req: any): Promise<{
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
    joinMess(messID: number, req: any): Promise<{
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
