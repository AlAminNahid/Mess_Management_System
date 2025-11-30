import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Timestamp,
  UpdateDateColumn
} from 'typeorm';
import { MessesEntity } from './messes.entity';

@Entity('utility_costs')
export class UtilityCostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MessesEntity, (mess) => mess.id)
  mess_id : MessesEntity;

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

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Timestamp;
}
