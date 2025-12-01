import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MessesEntity } from './messes.entity';
import { UsersEntity } from './users.entity';
import { MealExpenseIterationsEntity } from './meal_expense_iterations.entity';
import { NoticesEntity } from './notices.enitity';
import { MealsEntity } from './meals.entity';

@Entity('members')
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MessesEntity, (mess) => mess.id)
  @JoinColumn({
    name : 'mess_id'
  })
  mess : MessesEntity;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({
    name : 'user_id'
  })
  user: UsersEntity;

  @Column({
    type: 'enum',
    enum: [true, false],
    default: true,
  })
  is_active: boolean;

  @Column({
    type: 'enum',
    enum: ['manager', 'member', 'user'],
    default: 'user',
  })
  role: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  leave_date: Timestamp;

  @CreateDateColumn()
  join_date: Timestamp;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @OneToMany(() => MealExpenseIterationsEntity, (meal) => meal.member)
  meal_expense : MealExpenseIterationsEntity[];

  @OneToMany(() => MealsEntity, (meal) => meal.member)
  meals : MealsEntity[];

  // @OneToMany(() => NoticesEntity, (notice) => notice.member)
  // notices : NoticesEntity[];
}
