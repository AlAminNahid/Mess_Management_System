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
exports.MessController = void 0;
const common_1 = require("@nestjs/common");
const mess_service_1 = require("./mess.service");
const passport_1 = require("@nestjs/passport");
const messes_dto_1 = require("../dtos/messes.dto");
let MessController = class MessController {
    messService;
    constructor(messService) {
        this.messService = messService;
    }
    createMess(info, req) {
        const userID = req.user.userID;
        return this.messService.createMess(info.name, info.address, userID);
    }
    joinMess(messID, req) {
        const userID = req.user.userID;
        return this.messService.joinMess(messID, userID);
    }
};
exports.MessController = MessController;
__decorate([
    (0, common_1.Post)('createMess'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messes_dto_1.CreateMessDTO, Object]),
    __metadata("design:returntype", void 0)
], MessController.prototype, "createMess", null);
__decorate([
    (0, common_1.Post)('joinMess'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)('messID')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MessController.prototype, "joinMess", null);
exports.MessController = MessController = __decorate([
    (0, common_1.Controller)('mess'),
    __metadata("design:paramtypes", [mess_service_1.MessService])
], MessController);
//# sourceMappingURL=mess.controller.js.map