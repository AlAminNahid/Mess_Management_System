import { Timestamp } from 'typeorm';
import { MembersEntity } from './members.entity';
export declare class MealExpenseIterationsEntity {
    id: number;
    member: MembersEntity;
    amount: number;
    date: Timestamp;
    description: string;
    manager_id: number;
    created_at: Timestamp;
    updated_at: Timestamp;
}
