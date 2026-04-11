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
exports.MessService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const members_entity_1 = require("../entities/members.entity");
const messes_entity_1 = require("../entities/messes.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
let MessService = class MessService {
    usersRepository;
    memberRepository;
    messRepository;
    constructor(usersRepository, memberRepository, messRepository) {
        this.usersRepository = usersRepository;
        this.memberRepository = memberRepository;
        this.messRepository = messRepository;
    }
    async createMess(name, address, userID) {
        const existing = await this.messRepository.findOne({ where: { name } });
        if (existing) {
            throw new common_1.BadRequestException('With this name a mess is already registered, try another name');
        }
        const messInfo = await this.messRepository.create({
            name,
            address,
        });
        await this.messRepository.save(messInfo);
        const userInfo = await this.usersRepository.findOne({
            where: { id: userID },
        });
        if (!userInfo) {
            throw new common_1.NotFoundException('User not found');
        }
        const memberInfo = await this.memberRepository.create({
            mess: messInfo,
            user: userInfo,
            role: 'manager',
        });
        await this.memberRepository.save(memberInfo);
        console.log('Mess created and member inserted successfully');
        const show_info = {
            id: memberInfo.id,
            user_name: userInfo.name,
            user_email: userInfo.email,
            user_phone: userInfo.phone,
            role: memberInfo.role,
            mess_name: messInfo.name,
            mess_address: messInfo.address,
        };
        return {
            message: 'Mess created and manager inserted successfully',
            'mess & member info': show_info,
        };
    }
    async joinMess(messID, userID) {
        const mess_info = await this.messRepository.findOne({
            where: { id: messID },
        });
        if (!mess_info) {
            throw new common_1.NotFoundException('Mess not found');
        }
        const user_info = await this.usersRepository.findOne({
            where: { id: userID },
        });
        if (!user_info) {
            throw new common_1.NotFoundException('User not found');
        }
        console.log(userID);
        const existing_member = await this.memberRepository.findOne({
            where: {
                user: { id: userID },
                mess: { id: messID },
            },
            relations: ['user', 'mess'],
        });
        if (existing_member) {
            throw new common_1.BadRequestException('User is already a member of a mess');
        }
        const member = await this.memberRepository.create({
            mess: mess_info,
            user: user_info,
            role: 'member',
        });
        await this.memberRepository.save(member);
        const info_show = {
            id: member.id,
            member_name: user_info.name,
            member_email: user_info.email,
            member_phone: user_info.phone,
            member_role: member.role,
            mess_name: mess_info.name,
            mess_address: mess_info.address,
        };
        return {
            message: 'Member joined successfully',
            'mess & member info': info_show,
        };
    }
};
exports.MessService = MessService;
exports.MessService = MessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(members_entity_1.MembersEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(messes_entity_1.MessesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessService);
//# sourceMappingURL=mess.service.js.map