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
exports.mealInsertDTO = void 0;
const class_validator_1 = require("class-validator");
class mealInsertDTO {
    meal_count;
    member_id;
}
exports.mealInsertDTO = mealInsertDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({
        message: `Meal count can't be a negative number`,
    }),
    __metadata("design:type", Number)
], mealInsertDTO.prototype, "meal_count", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({
        message: `MemberID can't be a positive number`,
    }),
    __metadata("design:type", Number)
], mealInsertDTO.prototype, "member_id", void 0);
//# sourceMappingURL=meal_insert.dto.js.map