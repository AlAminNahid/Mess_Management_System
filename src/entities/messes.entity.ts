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
import { UsersEntity } from './users.entity';
import { MembersEntity } from './members.entity';
import { NoticesEntity } from './notices.enitity';

@Entity('messes')
export class MessesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  address: string;

  @Column({
    type: 'boolean',
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

  @OneToMany(() => MembersEntity, (member) => member.mess_id)
  mess_id : MembersEntity[];
}
