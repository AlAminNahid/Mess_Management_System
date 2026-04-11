"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_connection_1 = require("./db.connection");
const auth_module_1 = require("./auth/auth.module");
const manager_module_1 = require("./manager/manager.module");
const mess_module_1 = require("./mess/mess.module");
const member_module_1 = require("./member/member.module");
const db = new db_connection_1.dbConnection();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: db.type,
                host: db.host,
                port: db.port,
                username: db.username,
                password: db.password,
                database: db.database,
                autoLoadEntities: true,
                synchronize: true
            }), auth_module_1.AuthModule, manager_module_1.ManagerModule, mess_module_1.MessModule, member_module_1.MemberModule],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map