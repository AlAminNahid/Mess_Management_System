import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('meals')
export class MealsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    mess_id: number;

    @Column({ type: 'int' })
    user_id: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'int', default: 0 })
    lunch_count: number;

    @Column({ type: 'int', default: 0 })
    dinner_count: number;
}
