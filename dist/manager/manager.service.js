"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const meal_expense_iterations_entity_1 = require("../entities/meal_expense_iterations.entity");
const meals_entity_1 = require("../entities/meals.entity");
const members_entity_1 = require("../entities/members.entity");
const messes_entity_1 = require("../entities/messes.entity");
const notices_enitity_1 = require("../entities/notices.enitity");
const users_entity_1 = require("../entities/users.entity");
const utility_costs_entity_1 = require("../entities/utility_costs.entity");
const typeorm_2 = require("typeorm");
let ManagerService = class ManagerService {
    memberRepository;
    userRepository;
    mealRepository;
    mealExpenseRepositor;
    utilityCostsRepository;
    messRepository;
    noticeRepository;
    constructor(memberRepository, userRepository, mealRepository, mealExpenseRepositor, utilityCostsRepository, messRepository, noticeRepository) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
        this.mealRepository = mealRepository;
        this.mealExpenseRepositor = mealExpenseRepositor;
        this.utilityCostsRepository = utilityCostsRepository;
        this.messRepository = messRepository;
        this.noticeRepository = noticeRepository;
    }
    getManagerDashboard() {
        return 'Welcome to the dashboard Manager';
    }
    async insertMeals(mealCount, memberID, userID) {
        const user = await this.userRepository.findOne({ where: { id: userID } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const memberInfo = await this.memberRepository.findOne({
            where: { id: memberID },
        });
        if (!memberInfo) {
            throw new common_1.NotFoundException('Member not found');
        }
        const meal = await this.mealRepository.create({
            meal_count: mealCount,
            manager_id: userID,
            member: memberInfo,
        });
        await this.mealRepository.save(meal);
        return {
            message: 'Meal inserted successfully',
            member_id: memberInfo.id,
            date: meal.date,
            meal_count: meal.meal_count,
            manager_name: user.name,
        };
    }
    async updateMeals(mealID, mealCount, memberID, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingMeal = await this.mealRepository.findOne({
            where: { id: mealID },
        });
        if (!existingMeal) {
            throw new common_1.NotFoundException('Meal not found');
        }
        const memberInfo = await this.memberRepository.findOne({
            where: { id: memberID },
        });
        if (!memberInfo) {
            throw new common_1.NotFoundException('Member not found');
        }
        existingMeal.meal_count = mealCount;
        existingMeal.member = memberInfo;
        existingMeal.manager_id = userID;
        await this.mealRepository.save(existingMeal);
        return {
            message: 'Meal updated successfully',
            member_id: memberInfo.id,
            date: existingMeal.date,
            meal_count: existingMeal.meal_count,
            manager_name: user.name,
        };
    }
    async insertMealExpenses(amount, description, memberID, userID) {
        const memberInfo = await this.memberRepository.findOne({
            where: { id: memberID },
        });
        if (!memberInfo) {
            throw new common_1.NotFoundException('Member not found');
        }
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        const mealExpense = await this.mealExpenseRepositor.create({
            member: memberInfo,
            manager_id: userID,
            amount: amount,
            description: description,
        });
        await this.mealExpenseRepositor.save(mealExpense);
        return {
            message: 'Meal Expense Iteration is successfully inserted',
            member_id: memberInfo.id,
            amount: mealExpense.amount,
            date: mealExpense.date,
            description: mealExpense.description,
            manager_name: user.name,
        };
    }
    async updateMealExpenses(mealExpensID, amount, description, memberID, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingMealExpens = await this.mealExpenseRepositor.findOne({
            where: { id: mealExpensID },
        });
        if (!existingMealExpens) {
            throw new common_1.NotFoundException('Meal Expense Iteration is not found');
        }
        const memberInfo = await this.memberRepository.findOne({
            where: { id: memberID },
        });
        if (!memberInfo) {
            throw new common_1.NotFoundException('Member not found');
        }
        existingMealExpens.amount = amount;
        existingMealExpens.description = description;
        existingMealExpens.member = memberInfo;
        existingMealExpens.manager_id = userID;
        await this.mealExpenseRepositor.save(existingMealExpens);
        return {
            message: 'Meal Expense Iteration is successfully updated',
            member_id: memberInfo.id,
            amount: existingMealExpens.amount,
            date: existingMealExpens.date,
            description: existingMealExpens.description,
            manager_name: user.name,
        };
    }
    async insertUtiltyCosts(messID, rent, electricity, internet, gas, maid, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const mess = await this.messRepository.findOne({
            where: { id: messID },
        });
        if (!mess) {
            throw new common_1.NotFoundException('Mess not found');
        }
        const utilityCosts = await this.utilityCostsRepository.create({
            mess: mess,
            rent: rent,
            electricity: electricity,
            internet: internet,
            gas: gas,
            maid: maid,
            manager_id: userID,
        });
        await this.utilityCostsRepository.save(utilityCosts);
        return {
            message: 'Utility cost is inserted successfully',
            mess_name: mess.name,
            mess_address: mess.address,
            rent: utilityCosts.rent,
            internet: utilityCosts.internet,
            electricity: utilityCosts.electricity,
            gas: utilityCosts.gas,
            maid: utilityCosts.maid,
            manager_name: user.name,
        };
    }
    async updateUtilityCosts(utilityCostID, messID, rent, electricity, internet, gas, maid, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingUtilityCosts = await this.utilityCostsRepository.findOne({
            where: { id: utilityCostID },
        });
        if (!existingUtilityCosts) {
            throw new common_1.NotFoundException('Utility Cost not found');
        }
        const mess = await this.messRepository.findOne({
            where: { id: messID },
        });
        if (!mess) {
            throw new common_1.NotFoundException('Mess not found');
        }
        existingUtilityCosts.rent = rent;
        existingUtilityCosts.electricity = electricity;
        existingUtilityCosts.internet = internet;
        existingUtilityCosts.gas = gas;
        existingUtilityCosts.maid = maid;
        await this.utilityCostsRepository.save(existingUtilityCosts);
        return {
            message: 'Utility cost is updated successfully',
            mess_name: mess.name,
            mess_address: mess.address,
            rent: existingUtilityCosts.rent,
            internet: existingUtilityCosts.internet,
            electricity: existingUtilityCosts.electricity,
            gas: existingUtilityCosts.gas,
            maid: existingUtilityCosts.maid,
            manager_name: user.name,
        };
    }
    async sendNotice(title, description, notice_type, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const member = await this.memberRepository.findOne({
            where: { user: { id: userID } },
        });
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        const notice = await this.noticeRepository.create({
            title: title,
            description: description,
            notice_type: notice_type,
            member: member,
        });
        await this.noticeRepository.save(notice);
        return {
            message: 'Notice is sended successfully',
            title: notice.title,
            description: notice.description,
            date: notice.posted_date,
            notice_type: notice.notice_type,
            sended_by: user.name,
        };
    }
    async getNotices(messID, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const mess = await this.messRepository.findOne({
            where: { id: messID },
        });
        if (!mess) {
            throw new common_1.NotFoundException('Mess not found');
        }
        const notices = await this.noticeRepository.find({
            select: {
                title: true,
                description: true,
                notice_type: true,
                posted_date: true,
                member: { id: true, mess: { name: true, address: true } },
            },
            relations: {
                member: {
                    mess: true,
                },
            },
            where: {
                member: {
                    mess: { id: messID },
                },
            },
        });
        return {
            message: 'All the notices',
            notices,
        };
    }
    async deactivateMember(memberID, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const member = await this.memberRepository.findOne({
            where: { id: memberID },
        });
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        member.is_active = false;
        await this.memberRepository.save(member);
        return {
            message: 'Member deactivated successfully',
            member_id: member.id,
            is_active_status: member.is_active,
            manager_name: user.name,
        };
    }
    async deactivateMess(messID, userID) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const mess = await this.messRepository.findOne({
            where: { id: messID },
        });
        if (!mess) {
            throw new common_1.NotFoundException('Mess not found');
        }
        mess.is_active = false;
        await this.messRepository.save(mess);
        await this.memberRepository
            .createQueryBuilder()
            .update()
            .set({ is_active: false })
            .where('messId = :messID', { messID })
            .execute();
        return {
            message: 'Mess and all members deactivated successfully',
            mess_id: mess.id,
            mess_name: mess.name,
            manager: user.name,
        };
    }
};
exports.ManagerService = ManagerService;
exports.ManagerService = ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(members_entity_1.MembersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(meals_entity_1.MealsEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(meal_expense_iterations_entity_1.MealExpenseIterationsEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(utility_costs_entity_1.UtilityCostsEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(messes_entity_1.MessesEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(notices_enitity_1.NoticesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ManagerService);
//# sourceMappingURL=manager.service.js.map