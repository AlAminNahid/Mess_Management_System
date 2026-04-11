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
exports.mealExpenseInsertDTO = void 0;
const class_validator_1 = require("class-validator");
class mealExpenseInsertDTO {
    amount;
    description;
    member_id;
}
exports.mealExpenseInsertDTO = mealExpenseInsertDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({
        message: `Amount can't be negative`
    }),
    __metadata("design:type", Number)
], mealExpenseInsertDTO.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: "Description has to be a string"
    }),
    __metadata("design:type", String)
], mealExpenseInsertDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)({
        message: `ID number can't be negative`
    }),
    __metadata("design:type", Number)
], mealExpenseInsertDTO.prototype, "member_id", void 0);
//# sourceMappingURL=meal_expense_insert.dto.js.map