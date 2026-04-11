import { MembersEntity } from './members.entity';
export declare class UsersEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    nid: string;
    phone: string;
    avater: string;
    created_at: string;
    updated_at: string;
    members: MembersEntity[];
}
