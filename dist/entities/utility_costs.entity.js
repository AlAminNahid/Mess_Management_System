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
exports.UtilityCostsEntity = void 0;
const typeorm_1 = require("typeorm");
const messes_entity_1 = require("./messes.entity");
let UtilityCostsEntity = class UtilityCostsEntity {
    id;
    mess;
    date;
    rent;
    internet;
    electricity;
    maid;
    gas;
    manager_id;
    created_at;
    updated_at;
};
exports.UtilityCostsEntity = UtilityCostsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => messes_entity_1.MessesEntity, (mess) => mess.utility_costs),
    (0, typeorm_1.JoinColumn)({
        name: 'mess_id'
    }),
    __metadata("design:type", messes_entity_1.MessesEntity)
], UtilityCostsEntity.prototype, "mess", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp'
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], UtilityCostsEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "rent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "internet", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "electricity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "maid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "gas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], UtilityCostsEntity.prototype, "manager_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], UtilityCostsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], UtilityCostsEntity.prototype, "updated_at", void 0);
exports.UtilityCostsEntity = UtilityCostsEntity = __decorate([
    (0, typeorm_1.Entity)('utility_costs')
], UtilityCostsEntity);
//# sourceMappingURL=utility_costs.entity.js.map