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
exports.MessesEntity = void 0;
const typeorm_1 = require("typeorm");
const members_entity_1 = require("./members.entity");
const utility_costs_entity_1 = require("./utility_costs.entity");
let MessesEntity = class MessesEntity {
    id;
    name;
    address;
    is_active;
    created_at;
    updated_at;
    members;
    utility_costs;
};
exports.MessesEntity = MessesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
        unique: true
    }),
    __metadata("design:type", String)
], MessesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], MessesEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: [true, false],
        default: true
    }),
    __metadata("design:type", Boolean)
], MessesEntity.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MessesEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], MessesEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => members_entity_1.MembersEntity, (member) => member.mess),
    __metadata("design:type", Array)
], MessesEntity.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => utility_costs_entity_1.UtilityCostsEntity, (cost) => cost.mess),
    __metadata("design:type", Array)
], MessesEntity.prototype, "utility_costs", void 0);
exports.MessesEntity = MessesEntity = __decorate([
    (0, typeorm_1.Entity)('messes')
], MessesEntity);
//# sourceMappingURL=messes.entity.js.map