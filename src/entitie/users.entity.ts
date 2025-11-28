import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MealsEntity } from "./meals.entity";
import { MembersEntity } from "./member.entity";
import { ExpenseIterationsEntity } from "./expense_iterations.entity";
import { MessesEntity } from "./messes.entity";

@Entity('users')
export class UsersEntity{
    @PrimaryGeneratedColumn({
        type : 'int'
    })
    id : number;

    @Column({
        type : 'varchar',
        length : 200
    })
    name : string;

    @Column({
        type : 'varchar'
    })
    email : string;

    @Column()
    password : string;

    @IsOptional()
    @Column({
        type : 'enum',
        enum : ['manager', 'member', 'admin'],
        default : 'member'
    })
    role : string;

    @IsOptional()
    @Column({
        type : 'enum',
        enum : [true, false],
        default : true
    })
    is_active : boolean;

    @Column({
        type : 'varchar',
        unique : true,
        length : 14
    })
    nid : string;

    @Column({
        type : 'varchar',
        unique : true,
    })
    phone : string;

    @IsOptional()
    @Column({
        type : 'varchar',
        nullable : true
    })
    avater : string;

    @CreateDateColumn()
    created_at : string;

    @UpdateDateColumn()
    updated_at : string;

    @OneToMany(() => MealsEntity, (meals) => meals.user)
    meals : MealsEntity[];

    @OneToMany(() => MembersEntity, (member) => member.user)
    member : MembersEntity[];

    @OneToMany(() => ExpenseIterationsEntity, (expenseIteration) => expenseIteration.user)
    expenseIteration : ExpenseIterationsEntity[];

    @OneToMany(() => ExpenseIterationsEntity, (expense) => expense.users)
    expense : ExpenseIterationsEntity[];

    @OneToMany(() => MessesEntity, (messes) => messes.user)
    messes : MealsEntity[];
}