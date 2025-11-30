import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { MessesEntity } from './messes.entity';
import { UsersEntity } from './users.entity';
import { MealExpenseIterationsEntity } from './meal_expense_iterations.entity';
import { NoticesEntity } from './notices.enitity';

@Entity('members')
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MessesEntity, (mess) => mess.id)
  mess_id : MessesEntity;

  @OneToMany(() => UsersEntity, (user) => user.id)
  user_id: UsersEntity[];

  @Column({
    type: 'enum',
    enum: [true, false],
    default: true,
  })
  is_active: boolean;

  @Column({
    type: 'enum',
    enum: ['manager', 'member'],
    default: 'member',
  })
  role: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  leave_date: Timestamp;

  @Column({
    type: 'timestamp',
  })
  join_date: Timestamp;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @OneToMany(() => MealExpenseIterationsEntity, (meal) => meal.member_id)
  member_id : MealExpenseIterationsEntity[];

  @OneToMany(() => NoticesEntity, (notice) => notice.member_id)
  member_notice_id : NoticesEntity[];
}
