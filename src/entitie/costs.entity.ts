import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MessesEntity } from "./messes.entity";

@Entity('costs')
export class CostsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MessesEntity, mess => mess.costs)
    @JoinColumn({
        name : 'mess_id'
    })
    mess : MessesEntity;

    @Column()
    mess_id : number

    @Column({
        type : 'decimal',
        precision : 10,
        scale : 2
    })
    rent: number;

    @Column({
        type : 'decimal',
        precision : 10,
        scale : 2
    })
    internet: number;

    @Column({
        type : 'decimal',
        precision : 10,
        scale : 2
    })
    electricity: number;

    @Column({
        type : 'decimal',
        precision : 10,
        scale : 2
    })
    maid: number;

    @Column({
        type : 'decimal',
        precision : 10,
        scale : 2
    })
    gas: number;

    @CreateDateColumn()
    created_at : string;
}
