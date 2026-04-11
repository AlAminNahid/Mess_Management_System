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
exports.NoticesEntity = void 0;
const typeorm_1 = require("typeorm");
const members_entity_1 = require("./members.entity");
let NoticesEntity = class NoticesEntity {
    id;
    title;
    description;
    posted_date;
    member;
    notice_type;
    created_at;
    updated_at;
};
exports.NoticesEntity = NoticesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NoticesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100
    }),
    __metadata("design:type", String)
], NoticesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], NoticesEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp'
    }),
    __metadata("design:type", typeorm_1.Timestamp)
], NoticesEntity.prototype, "posted_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => members_entity_1.MembersEntity, (member) => member.notices),
    (0, typeorm_1.JoinColumn)({
        name: 'member_id'
    }),
    __metadata("design:type", members_entity_1.MembersEntity)
], NoticesEntity.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['annoucement', 'shopping_request']
    }),
    __metadata("design:type", String)
], NoticesEntity.prototype, "notice_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], NoticesEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], NoticesEntity.prototype, "updated_at", void 0);
exports.NoticesEntity = NoticesEntity = __decorate([
    (0, typeorm_1.Entity)('notices')
], NoticesEntity);
//# sourceMappingURL=notices.enitity.js.map