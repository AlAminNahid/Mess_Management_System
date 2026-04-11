import { Timestamp } from 'typeorm';
import { MessesEntity } from './messes.entity';
export declare class UtilityCostsEntity {
    id: number;
    mess: MessesEntity;
    date: Timestamp;
    rent: number;
    internet: number;
    electricity: number;
    maid: number;
    gas: number;
    manager_id: number;
    created_at: Timestamp;
    updated_at: Timestamp;
}
