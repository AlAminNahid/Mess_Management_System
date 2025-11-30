import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { MembersEntity } from './members.entity';

@Entity('meal_expense_iterations')
export class MealExpenseIterationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MembersEntity, (member) => member.user_id)
  member_id : MembersEntity;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    type: 'timestamp',
  })
  date: Timestamp;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column()
  manager_id : number; // Will get this from the JWT token

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Timestamp;
}
