import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembersEntity } from './members.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 14,
  })
  nid: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avater: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToMany(() => MembersEntity, (member) => member.user)
  members: MembersEntity[]; 
}
