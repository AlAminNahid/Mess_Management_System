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
exports.MemberService = void 0;
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
let MemberService = class MemberService {
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
    getMemberDashboard() {
        return 'Welcome to the dashboard member';
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
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
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
], MemberService);
//# sourceMappingURL=member.service.js.map