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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const manager_service_1 = require("./manager.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const role_enum_1 = require("../dtos/role.enum");
const meal_insert_dto_1 = require("../dtos/meal_insert.dto");
const meal_expense_insert_dto_1 = require("../dtos/meal_expense_insert.dto");
const utility_cost_dto_1 = require("../dtos/utility_cost.dto");
const notice_dto_1 = require("../dtos/notice.dto");
let ManagerController = class ManagerController {
    managerService;
    constructor(managerService) {
        this.managerService = managerService;
    }
    getManagerDashboard() {
        return this.managerService.getManagerDashboard();
    }
    insertMeals(info, req) {
        const userID = req.user.userID;
        return this.managerService.insertMeals(info.meal_count, info.member_id, userID);
    }
    updateMeals(mealID, info, req) {
        const userID = req.user.userID;
        return this.managerService.updateMeals(mealID, info.meal_count, info.member_id, userID);
    }
    insertMealExpenses(info, req) {
        const userID = req.user.userID;
        return this.managerService.insertMealExpenses(info.amount, info.description, info.member_id, userID);
    }
    updateMealExpenses(mealExpensID, info, req) {
        const userID = req.user.userID;
        return this.managerService.updateMealExpenses(mealExpensID, info.amount, info.description, info.member_id, userID);
    }
    insertUtiltyCosts(info, req) {
        const userID = req.user.userID;
        return this.managerService.insertUtiltyCosts(info.mess_id, info.rent, info.electricity, info.internet, info.gas, info.maid, userID);
    }
    updateUtilityCosts(utilityCostID, info, req) {
        const userID = req.user.userID;
        return this.managerService.updateUtilityCosts(utilityCostID, info.mess_id, info.rent, info.electricity, info.internet, info.gas, info.maid, userID);
    }
    sendNotice(info, req) {
        const userID = req.user.userID;
        return this.managerService.sendNotice(info.title, info.description, info.notice_type, userID);
    }
    getNotices(messID, req) {
        const userID = req.user.userID;
        return this.managerService.getNotices(messID, userID);
    }
    deactivateMember(memberID, req) {
        const userID = req.user.userID;
        return this.managerService.deactivateMember(memberID, userID);
    }
    deactivateMess(messID, req) {
        const userID = req.user.userID;
        return this.managerService.deactivateMess(messID, userID);
    }
};
exports.ManagerController = ManagerController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ManagerController.prototype, "getManagerDashboard", null);
__decorate([
    (0, common_1.Post)('insertMeals'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meal_insert_dto_1.mealInsertDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "insertMeals", null);
__decorate([
    (0, common_1.Put)('updateMeals/:mealID'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('mealID')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, meal_insert_dto_1.mealInsertDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "updateMeals", null);
__decorate([
    (0, common_1.Post)('insertMealExpenses'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meal_expense_insert_dto_1.mealExpenseInsertDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "insertMealExpenses", null);
__decorate([
    (0, common_1.Put)('updateMealExpenses/:mealExpensID'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('mealExpensID')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, meal_expense_insert_dto_1.mealExpenseInsertDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "updateMealExpenses", null);
__decorate([
    (0, common_1.Post)('insertUtiltyCosts'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [utility_cost_dto_1.utilityCostDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "insertUtiltyCosts", null);
__decorate([
    (0, common_1.Put)('updateUtilityCosts/:utilityCostID'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('utilityCostID')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, utility_cost_dto_1.utilityCostDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "updateUtilityCosts", null);
__decorate([
    (0, common_1.Post)('sendNotice'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_dto_1.NoticeDTO, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "sendNotice", null);
__decorate([
    (0, common_1.Get)('getNotices/:messID'),
    __param(0, (0, common_1.Param)('messID')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "getNotices", null);
__decorate([
    (0, common_1.Patch)('deactivate/member/:memberID'),
    __param(0, (0, common_1.Param)('memberID')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "deactivateMember", null);
__decorate([
    (0, common_1.Patch)('deactivate/mess/:messID'),
    __param(0, (0, common_1.Param)('messID')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "deactivateMess", null);
exports.ManagerController = ManagerController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.MANAGER),
    (0, common_1.Controller)('manager'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
//# sourceMappingURL=manager.controller.js.map