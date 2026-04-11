import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';
export declare class ManagerService {
    private memberRepository;
    private userRepository;
    private mealRepository;
    private mealExpenseRepositor;
    private utilityCostsRepository;
    private messRepository;
    private noticeRepository;
    constructor(memberRepository: Repository<MembersEntity>, userRepository: Repository<UsersEntity>, mealRepository: Repository<MealsEntity>, mealExpenseRepositor: Repository<MealExpenseIterationsEntity>, utilityCostsRepository: Repository<UtilityCostsEntity>, messRepository: Repository<MessesEntity>, noticeRepository: Repository<NoticesEntity>);
    getManagerDashboard(): string;
    insertMeals(mealCount: number, memberID: number, userID: number): Promise<{
        message: string;
        member_id: number;
        date: import("typeorm").Timestamp;
        meal_count: number;
        manager_name: string;
    }>;
    updateMeals(mealID: number, mealCount: number, memberID: number, userID: number): Promise<{
        message: string;
        member_id: number;
        date: import("typeorm").Timestamp;
        meal_count: number;
        manager_name: string;
    }>;
    insertMealExpenses(amount: number, description: string, memberID: number, userID: number): Promise<{
        message: string;
        member_id: number;
        amount: number;
        date: import("typeorm").Timestamp;
        description: string;
        manager_name: string;
    }>;
    updateMealExpenses(mealExpensID: number, amount: number, description: string, memberID: number, userID: number): Promise<{
        message: string;
        member_id: number;
        amount: number;
        date: import("typeorm").Timestamp;
        description: string;
        manager_name: string;
    }>;
    insertUtiltyCosts(messID: number, rent: number, electricity: number, internet: number, gas: number, maid: number, userID: number): Promise<{
        message: string;
        mess_name: string;
        mess_address: string;
        rent: number;
        internet: number;
        electricity: number;
        gas: number;
        maid: number;
        manager_name: string;
    }>;
    updateUtilityCosts(utilityCostID: number, messID: number, rent: number, electricity: number, internet: number, gas: number, maid: number, userID: number): Promise<{
        message: string;
        mess_name: string;
        mess_address: string;
        rent: number;
        internet: number;
        electricity: number;
        gas: number;
        maid: number;
        manager_name: string;
    }>;
    sendNotice(title: string, description: string, notice_type: string, userID: number): Promise<{
        message: string;
        title: string;
        description: string;
        date: import("typeorm").Timestamp;
        notice_type: string;
        sended_by: string;
    }>;
    getNotices(messID: number, userID: number): Promise<{
        message: string;
        notices: NoticesEntity[];
    }>;
    deactivateMember(memberID: number, userID: number): Promise<{
        message: string;
        member_id: number;
        is_active_status: boolean;
        manager_name: string;
    }>;
    deactivateMess(messID: number, userID: number): Promise<{
        message: string;
        mess_id: number;
        mess_name: string;
        manager: string;
    }>;
}
