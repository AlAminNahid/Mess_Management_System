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
exports.MealsEntity = void 0;
const typeorm_1 = require("typeorm");
const members_entity_1 = require("./members.entity");
let MealsEntity = class MealsEntity {
    id;
    member;
    date;
    meal_count;
    manager_id;
    created_at;
    updated_at;
};
exports.MealsEntity = MealsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MealsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => members_entity_1.MembersEntity, (member) => member.meals),
    (0, typeorm_1.JoinColumn)({
        name: 'member_id'
    }),
    __metadata("design:type", members_entity_1.MembersEntity)
], MealsEntity.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp'
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MealsEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], MealsEntity.prototype, "meal_count", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MealsEntity.prototype, "manager_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MealsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MealsEntity.prototype, "updated_at", void 0);
exports.MealsEntity = MealsEntity = __decorate([
    (0, typeorm_1.Entity)('meals')
], MealsEntity);
//# sourceMappingURL=meals.entity.js.map