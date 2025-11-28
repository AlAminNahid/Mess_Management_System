import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('members')
export class MembersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    mess_id: number;

    @Column({ type: 'int' })
    user_id: number;

    @Column({
        type: 'enum',
        enum: [true, false],
        default: true
    })
    is_active: boolean;

    @Column({ type: 'date', nullable: true })
    leave_date: string;

    @Column({ type: 'date' })
    join_date: string;
}
