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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealExpenseIterationsEntity = void 0;
const typeorm_1 = require("typeorm");
const members_entity_1 = require("./members.entity");
let MealExpenseIterationsEntity = class MealExpenseIterationsEntity {
    id;
    member;
    amount;
    date;
    description;
    manager_id;
    created_at;
    updated_at;
};
exports.MealExpenseIterationsEntity = MealExpenseIterationsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MealExpenseIterationsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => members_entity_1.MembersEntity, (member) => member.meal_expense),
    (0, typeorm_1.JoinColumn)({
        name: 'member_id'
    }),
    __metadata("design:type", members_entity_1.MembersEntity)
], MealExpenseIterationsEntity.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], MealExpenseIterationsEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp'
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MealExpenseIterationsEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], MealExpenseIterationsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MealExpenseIterationsEntity.prototype, "manager_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MealExpenseIterationsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MealExpenseIterationsEntity.prototype, "updated_at", void 0);
exports.MealExpenseIterationsEntity = MealExpenseIterationsEntity = __decorate([
    (0, typeorm_1.Entity)('meal_expense_iterations')
], MealExpenseIterationsEntity);
//# sourceMappingURL=meal_expense_iterations.entity.js.map