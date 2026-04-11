import { Timestamp } from 'typeorm';
import { MembersEntity } from './members.entity';
export declare class NoticesEntity {
    id: number;
    title: string;
    description: string;
    posted_date: Timestamp;
    member: MembersEntity;
    notice_type: string;
    created_at: Timestamp;
    updated_at: Timestamp;
}
