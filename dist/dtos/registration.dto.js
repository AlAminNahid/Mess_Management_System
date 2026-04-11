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
exports.registrationDTO = void 0;
const class_validator_1 = require("class-validator");
class registrationDTO {
    name;
    email;
    password;
    nid;
    phone;
}
exports.registrationDTO = registrationDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: `Name can't be empty.`,
    }),
    (0, class_validator_1.MaxLength)(200, {
        message: `Name length can't be greater then 200`,
    }),
    (0, class_validator_1.Matches)(/^[A-Za-z ]+$/, {
        message: `Name can't contain any number`,
    }),
    __metadata("design:type", String)
], registrationDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: `Email can't be empty.`,
    }),
    (0, class_validator_1.Matches)(/^[a-z0-9.]+@gmail.com$/, {
        message: 'Email must contain @gmail.com at the end and all the character should be in lower case',
    }),
    __metadata("design:type", String)
], registrationDTO.prototype, "email", void 0);
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
], registrationDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: 'Nid must contain 14 digits & only numbers',
    }),
    __metadata("design:type", String)
], registrationDTO.prototype, "nid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^01[0-9]+$/, {
        message: 'Phone number should only contain numbers & should start with 01',
    }),
    (0, class_validator_1.MaxLength)(11, {
        message: 'Phone number should be only 11 digits',
    }),
    __metadata("design:type", String)
], registrationDTO.prototype, "phone", void 0);
//# sourceMappingURL=registration.dto.js.map