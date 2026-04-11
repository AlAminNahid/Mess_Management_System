import { Timestamp } from 'typeorm';
import { MembersEntity } from './members.entity';
import { UtilityCostsEntity } from './utility_costs.entity';
export declare class MessesEntity {
    id: number;
    name: string;
    address: string;
    is_active: boolean;
    created_at: Timestamp;
    updated_at: Timestamp;
    members: MembersEntity[];
    utility_costs: UtilityCostsEntity[];
}
