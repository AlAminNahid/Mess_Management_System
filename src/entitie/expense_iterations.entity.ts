import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('expense_iterations')
export class ExpenseIterationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity, (users) => users.expense)
    @JoinColumn({
        name : 'member_id'
    })
    users : UsersEntity;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    amount: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => UsersEntity, (user) => user.expenseIteration)
    @JoinColumn({
        name : 'manager_id'
    })
    user : UsersEntity;
}
