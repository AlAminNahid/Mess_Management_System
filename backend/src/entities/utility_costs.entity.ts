import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Timestamp,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { MessesEntity } from './messes.entity';

@Entity('utility_costs')
export class UtilityCostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MessesEntity, (mess) => mess.utility_costs)
  @JoinColumn({
    name : 'mess_id'
  })
  mess : MessesEntity;

  @CreateDateColumn({
    type : 'timestamp'
  })
  date : Timestamp;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  rent: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  internet: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  electricity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  maid: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  gas: number;

  @Column({
    type: 'int'
  })
  manager_id : number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Timestamp;
}
