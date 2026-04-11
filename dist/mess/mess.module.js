"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessModule = void 0;
const common_1 = require("@nestjs/common");
const mess_controller_1 = require("./mess.controller");
const mess_service_1 = require("./mess.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const messes_entity_1 = require("../entities/messes.entity");
const members_entity_1 = require("../entities/members.entity");
let MessModule = class MessModule {
};
exports.MessModule = MessModule;
exports.MessModule = MessModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.UsersEntity, messes_entity_1.MessesEntity, members_entity_1.MembersEntity]),
        ],
        controllers: [mess_controller_1.MessController],
        providers: [mess_service_1.MessService],
    })
], MessModule);
//# sourceMappingURL=mess.module.js.map