import { ManagerService } from './manager.service';
import { mealInsertDTO } from 'src/dtos/meal_insert.dto';
import { mealExpenseInsertDTO } from 'src/dtos/meal_expense_insert.dto';
import { utilityCostDTO } from 'src/dtos/utility_cost.dto';
import { NoticeDTO } from 'src/dtos/notice.dto';
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    getManagerDashboard(): string;
    insertMeals(info: mealInsertDTO, req: any): Promise<{
        message: string;
        member_id: number;
        date: import("typeorm").Timestamp;
        meal_count: number;
        manager_name: string;
    }>;
    updateMeals(mealID: number, info: mealInsertDTO, req: any): Promise<{
        message: string;
        member_id: number;
        date: import("typeorm").Timestamp;
        meal_count: number;
        manager_name: string;
    }>;
    insertMealExpenses(info: mealExpenseInsertDTO, req: any): Promise<{
        message: string;
        member_id: number;
        amount: number;
        date: import("typeorm").Timestamp;
        description: string;
        manager_name: string;
    }>;
    updateMealExpenses(mealExpensID: number, info: mealExpenseInsertDTO, req: any): Promise<{
        message: string;
        member_id: number;
        amount: number;
        date: import("typeorm").Timestamp;
        description: string;
        manager_name: string;
    }>;
    insertUtiltyCosts(info: utilityCostDTO, req: any): Promise<{
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
    updateUtilityCosts(utilityCostID: number, info: utilityCostDTO, req: any): Promise<{
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
    sendNotice(info: NoticeDTO, req: any): Promise<{
        message: string;
        title: string;
        description: string;
        date: import("typeorm").Timestamp;
        notice_type: string;
        sended_by: string;
    }>;
    getNotices(messID: number, req: any): Promise<{
        message: string;
        notices: import("../entities/notices.enitity").NoticesEntity[];
    }>;
    deactivateMember(memberID: number, req: any): Promise<{
        message: string;
        member_id: number;
        is_active_status: boolean;
        manager_name: string;
    }>;
    deactivateMess(messID: number, req: any): Promise<{
        message: string;
        mess_id: number;
        mess_name: string;
        manager: string;
    }>;
}
