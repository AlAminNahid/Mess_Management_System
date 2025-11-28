import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('expense_iterations')
export class ExpenseIterationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    member_id: number;

    @Column({ type: 'int' })
    mess_id: number;

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

    @Column({ type: 'int' })
    manager_id: number;
}
