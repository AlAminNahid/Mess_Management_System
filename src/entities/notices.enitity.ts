import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { MessesEntity } from './messes.entity';
import { MembersEntity } from './members.entity';

@Entity('notices')
export class NoticesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length : 100
  })
  title : string;

  @Column({
    type : 'varchar'
  })
  description : string;

  @Column({
    type : 'timestamp'
  })
  posted_date : Timestamp;

  @ManyToOne(() => MembersEntity, (member) => member.user_id)
  member_id : MembersEntity;

  @Column({
    type : 'enum',
    enum : ['annoucement', 'shopping_request']
  })
  notice_type : string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
