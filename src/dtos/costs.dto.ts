import { IsNotEmpty, IsInt, IsDecimal, Min, Max, IsNumber } from "class-validator";

export class CreateCostDTO {
    @IsInt({ message: 'mess_id must be an integer.' })
    mess_id: number;

    @IsInt({ message: 'Month must be an integer value.' })
    @Min(1, { message: 'Month cannot be less than 1.' })
    @Max(12, { message: 'Month cannot be greater than 12.' })
    month: number;

    @IsInt({ message: 'Year must be a valid integer.' })
    year: number;

    @IsNumber({}, { message: 'Rent must be a decimal number.' })
    rent: number;

    @IsNumber({}, { message: 'Internet must be a decimal number.' })
    internet: number;

    @IsNumber({}, { message: 'Electricity must be a decimal number.' })
    electricity: number;

    @IsNumber({}, { message: 'Maid cost must be a decimal number.' })
    maid: number;

    @IsNumber({}, { message: 'Gas cost must be a decimal number.' })
    gas: number;
}
