import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('members')
export class MembersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity, (user) => user.member)
    @JoinColumn({
        name : 'user_id'
    })
    user : UsersEntity;

    @Column({
        type: 'enum',
        enum: [true, false],
        default: true
    })
    is_active: boolean;

    @Column({
        type: 'date', nullable: true
    })
    leave_date: string;

    @Column({ type: 'date' })
    join_date: string;
}
