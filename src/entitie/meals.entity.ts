import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UsersEntity } from "./users.entity";
import { MessesEntity } from "./messes.entity";

@Entity('meals')
export class MealsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MessesEntity, (mess) => mess.meals)
    @JoinColumn({
        name : 'mess_id'
    })
    mess : MessesEntity;

    @ManyToOne(() => UsersEntity, (user) => user.meals)
    @JoinColumn({
        name : 'users_id'
    })
    user : UsersEntity;

    @Column({
        type: 'date'
    })
    date: string;

    @Column({
        type: 'int', 
        default: 0 
    })
    lunch_count: number;

    @Column({
        type: 'int', default: 0
    })
    dinner_count: number;
}
