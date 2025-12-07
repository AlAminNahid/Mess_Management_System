import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { MembersEntity } from './members.entity';
import { NoticeType } from 'src/dtos/notice_type.enum';

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

  @CreateDateColumn({
    type : 'timestamp'
  })
  posted_date : Timestamp;

  @ManyToOne(() => MembersEntity, (member) => member.notices)
  @JoinColumn({
    name : 'member_id'
  })
  member : MembersEntity;

  @Column({
    type : 'enum',
    enum : NoticeType
  })
  notice_type : string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
