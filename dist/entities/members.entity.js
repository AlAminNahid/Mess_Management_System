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
exports.MembersEntity = void 0;
const typeorm_1 = require("typeorm");
const messes_entity_1 = require("./messes.entity");
const users_entity_1 = require("./users.entity");
const meal_expense_iterations_entity_1 = require("./meal_expense_iterations.entity");
const notices_enitity_1 = require("./notices.enitity");
const meals_entity_1 = require("./meals.entity");
let MembersEntity = class MembersEntity {
    id;
    mess;
    user;
    is_active;
    role;
    leave_date;
    join_date;
    created_at;
    updated_at;
    meal_expense;
    meals;
    notices;
};
exports.MembersEntity = MembersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MembersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => messes_entity_1.MessesEntity, (mess) => mess.id),
    (0, typeorm_1.JoinColumn)({
        name: 'mess_id'
    }),
    __metadata("design:type", messes_entity_1.MessesEntity)
], MembersEntity.prototype, "mess", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, (user) => user.id),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id'
    }),
    __metadata("design:type", users_entity_1.UsersEntity)
], MembersEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: [true, false],
        default: true,
    }),
    __metadata("design:type", Boolean)
], MembersEntity.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['manager', 'member', 'user'],
        default: 'user',
    }),
    __metadata("design:type", String)
], MembersEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MembersEntity.prototype, "leave_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], MembersEntity.prototype, "join_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], MembersEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], MembersEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => meal_expense_iterations_entity_1.MealExpenseIterationsEntity, (meal) => meal.member),
    __metadata("design:type", Array)
], MembersEntity.prototype, "meal_expense", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => meals_entity_1.MealsEntity, (meal) => meal.member),
    __metadata("design:type", Array)
], MembersEntity.prototype, "meals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notices_enitity_1.NoticesEntity, (notice) => notice.member),
    __metadata("design:type", Array)
], MembersEntity.prototype, "notices", void 0);
exports.MembersEntity = MembersEntity = __decorate([
    (0, typeorm_1.Entity)('members')
], MembersEntity);
//# sourceMappingURL=members.entity.js.map