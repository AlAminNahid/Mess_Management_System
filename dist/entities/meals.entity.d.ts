import { Timestamp } from 'typeorm';
import { MembersEntity } from './members.entity';
export declare class MealsEntity {
    id: number;
    member: MembersEntity;
    date: Timestamp;
    meal_count: number;
    manager_id: number;
    created_at: Timestamp;
    updated_at: Timestamp;
}
