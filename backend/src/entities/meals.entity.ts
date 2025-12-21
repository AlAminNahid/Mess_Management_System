import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MembersEntity } from './members.entity';

@Entity('meals')
export class MealsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MembersEntity, (member) => member.meals)
  @JoinColumn({
    name : 'member_id'
  })
  member : MembersEntity;

  @CreateDateColumn({
    type : 'timestamp'
  })
  date: Timestamp;

  @Column({
    type: 'int',
    default: 0,
  })
  meal_count: number;

  @Column()
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
