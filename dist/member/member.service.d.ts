import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';
export declare class MemberService {
    private memberRepository;
    private userRepository;
    private mealRepository;
    private mealExpenseRepositor;
    private utilityCostsRepository;
    private messRepository;
    private noticeRepository;
    constructor(memberRepository: Repository<MembersEntity>, userRepository: Repository<UsersEntity>, mealRepository: Repository<MealsEntity>, mealExpenseRepositor: Repository<MealExpenseIterationsEntity>, utilityCostsRepository: Repository<UtilityCostsEntity>, messRepository: Repository<MessesEntity>, noticeRepository: Repository<NoticesEntity>);
    getMemberDashboard(): string;
    sendNotice(title: string, description: string, notice_type: string, userID: number): Promise<{
        message: string;
        title: string;
        description: string;
        date: import("typeorm").Timestamp;
        notice_type: string;
        sended_by: string;
    }>;
}
