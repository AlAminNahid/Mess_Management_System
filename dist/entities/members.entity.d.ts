import { Timestamp } from 'typeorm';
import { MessesEntity } from './messes.entity';
import { UsersEntity } from './users.entity';
import { MealExpenseIterationsEntity } from './meal_expense_iterations.entity';
import { NoticesEntity } from './notices.enitity';
import { MealsEntity } from './meals.entity';
export declare class MembersEntity {
    id: number;
    mess: MessesEntity;
    user: UsersEntity;
    is_active: boolean;
    role: string;
    leave_date: Timestamp;
    join_date: Timestamp;
    created_at: Timestamp;
    updated_at: Timestamp;
    meal_expense: MealExpenseIterationsEntity[];
    meals: MealsEntity[];
    notices: NoticesEntity[];
}
