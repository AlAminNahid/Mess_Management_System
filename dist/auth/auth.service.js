"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const members_entity_1 = require("../entities/members.entity");
let AuthService = class AuthService {
    usersRepository;
    memberRepository;
    jwtService;
    constructor(usersRepository, memberRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
    }
    async registration(name, email, password, nid, phone) {
        const existing = await this.usersRepository.findOne({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
            nid,
            phone,
        });
        await this.usersRepository.save(user);
        console.log('Users registration successful');
        const { password: _, ...result } = user;
        return result;
    }
    async login(email, password) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const member = await this.memberRepository.findOne({
            where: { user: { id: user.id } },
            relations: ['mess'],
        });
        console.log('Users login successful');
        const payload = {
            sub: user.id,
            email: user.email,
            role: member?.role
        };
        const token = await this.jwtService.signAsync(payload);
        if (!member || member.is_active === false) {
            return {
                access_token: token,
                message: 'You are not in any mess. Would you like to join one or create one?',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        }
        return {
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            member: {
                id: member.id,
                role: member.role,
                is_active: member.is_active,
                mess_id: member.mess?.id,
                join_date: member.join_date,
            },
        };
    }
    async changePassword(email, oldPassword, newPassword) {
        const existing = await this.usersRepository.findOne({ where: { email } });
        if (!existing) {
            throw new common_1.BadRequestException('User not found');
        }
        const valid = await bcrypt.compare(oldPassword, existing.password);
        if (!valid) {
            throw new common_1.BadRequestException('Old password is not matched');
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const user = await this.usersRepository.update({ email }, { password: hashPassword });
        console.log('User password updated successfuly');
        const { password: _, ...result } = user;
        return result;
    }
    async forgetPassword(email, newPassword, confirmPassword) {
        const existing = await this.usersRepository.findOne({ where: { email } });
        if (!existing) {
            throw new common_1.BadRequestException('User not found');
        }
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException(`New password and Confirm password didn't match`);
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const user = await this.usersRepository.update({ email }, { password: hashPassword });
        console.log('Forget password is done');
        const { password: _, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(members_entity_1.MembersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map