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
exports.forgetPasswordDTO = void 0;
const class_validator_1 = require("class-validator");
class forgetPasswordDTO {
    email;
    newPassword;
    confirmPassword;
}
exports.forgetPasswordDTO = forgetPasswordDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: `Email can't be empty.`,
    }),
    (0, class_validator_1.Matches)(/^[a-z0-9.]+@gmail.com$/, {
        message: 'Email must contain @gmail.com at the end and all the character should be in lower case',
    }),
    __metadata("design:type", String)
], forgetPasswordDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: `Password can't be empty.`,
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
    }),
    (0, class_validator_1.Matches)(/^.*(?=[@#$&]).*$/, {
        message: 'Password must contain any of this (@ or # or $ or &) speical characters',
    }),
    __metadata("design:type", String)
], forgetPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: `Password can't be empty.`,
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
    }),
    (0, class_validator_1.Matches)(/^.*(?=[@#$&]).*$/, {
        message: 'Password must contain any of this (@ or # or $ or &) speical characters',
    }),
    __metadata("design:type", String)
], forgetPasswordDTO.prototype, "confirmPassword", void 0);
//# sourceMappingURL=forgetPassword.dto.js.map