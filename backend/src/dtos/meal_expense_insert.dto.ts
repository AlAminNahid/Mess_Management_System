import { IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class mealExpenseInsertDTO{
    @IsNumber()
    @IsPositive({
        message : `Amount can't be negative`
    })
    amount : number;

    @IsString({
        message : "Description has to be a string"
    })
    description : string;

    @IsInt()
    @IsPositive({
        message : `ID number can't be negative`
    })
    member_id : number;
}