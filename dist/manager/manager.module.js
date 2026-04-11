"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const manager_controller_1 = require("./manager.controller");
const manager_service_1 = require("./manager.service");
const typeorm_1 = require("@nestjs/typeorm");
const meals_entity_1 = require("../entities/meals.entity");
const meal_expense_iterations_entity_1 = require("../entities/meal_expense_iterations.entity");
const utility_costs_entity_1 = require("../entities/utility_costs.entity");
const members_entity_1 = require("../entities/members.entity");
const users_entity_1 = require("../entities/users.entity");
const messes_entity_1 = require("../entities/messes.entity");
const notices_enitity_1 = require("../entities/notices.enitity");
let ManagerModule = class ManagerModule {
};
exports.ManagerModule = ManagerModule;
exports.ManagerModule = ManagerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                meals_entity_1.MealsEntity,
                meal_expense_iterations_entity_1.MealExpenseIterationsEntity,
                utility_costs_entity_1.UtilityCostsEntity,
                members_entity_1.MembersEntity,
                users_entity_1.UsersEntity,
                messes_entity_1.MessesEntity,
                notices_enitity_1.NoticesEntity
            ]),
        ],
        controllers: [manager_controller_1.ManagerController],
        providers: [manager_service_1.ManagerService],
    })
], ManagerModule);
//# sourceMappingURL=manager.module.js.map