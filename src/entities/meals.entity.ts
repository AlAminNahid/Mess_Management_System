import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { MembersEntity } from './members.entity';

@Entity('meals')
export class MealsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => MembersEntity, (member) => member.meals)
  @JoinColumn({
    name: 'member_id',
  })
  member: MembersEntity;

  @Index()
  @CreateDateColumn({
    type: 'timestamp',
  })
  date: Timestamp;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'Lunch',
  })
  meal_type: string;

  @Column({
    type: 'int',
    default: 0,
  })
  meal_count: number;

  @Column()
  manager_id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Timestamp;
}
