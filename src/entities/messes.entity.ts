import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { MembersEntity } from './members.entity';
import { UtilityCostsEntity } from './utility_costs.entity';

@Entity('messes')
export class MessesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    unique : true
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  address: string;

  @Column({
    type: 'enum',
    enum : [true, false],
    default : true
  })
  is_active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Timestamp;

  @OneToMany(() => MembersEntity, (member) => member.mess)
  members : MembersEntity[];

  // @OneToMany(() => UtilityCostsEntity, (cost) => cost.mess)
  // utility_costs : UtilityCostsEntity[];
}
