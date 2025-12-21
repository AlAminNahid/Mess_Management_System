import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { MembersEntity } from './members.entity';

@Entity('meal_expense_iterations')
export class MealExpenseIterationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MembersEntity, (member) => member.meal_expense)
  @JoinColumn({
    name : 'member_id'
  })
  member : MembersEntity;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @CreateDateColumn({
    type : 'timestamp'
  })
  date: Timestamp;

  @Column({
    type: 'varchar',
  })
  description: string;

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
