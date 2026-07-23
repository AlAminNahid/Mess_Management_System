import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { MessesEntity } from './messes.entity';
import { UsersEntity } from './users.entity';

export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Entity('invites')
export class InvitesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => MessesEntity, (mess) => mess.id)
  @JoinColumn({ name: 'mess_id' })
  mess: MessesEntity;

  @Index()
  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'invited_user_id' })
  invited_user: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'invited_by_user_id' })
  invited_by: UsersEntity;

  @Column({
    type: 'enum',
    enum: InviteStatus,
    default: InviteStatus.PENDING,
  })
  status: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
