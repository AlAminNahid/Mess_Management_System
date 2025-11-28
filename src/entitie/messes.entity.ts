import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { CostsEntity } from "./costs.entity";
import { MealsEntity } from "./meals.entity";
import { UsersEntity } from "./users.entity";

@Entity('messes')
export class MessesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 200
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    address: string;

    @ManyToOne(() => UsersEntity, (user) => user.messes)
    @JoinColumn({
        name : 'manager_id'
    })
    user : UsersEntity;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @OneToMany(() => CostsEntity, (costs) => costs.mess)
    costs : CostsEntity[];
    
    @OneToMany(() => MealsEntity, (meals) => meals.mess)
    meals : MealsEntity;
}
