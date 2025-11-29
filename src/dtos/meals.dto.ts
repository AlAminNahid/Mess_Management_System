import { IsNotEmpty, IsInt, IsDateString, Min, IsOptional } from "class-validator";

export class CreateMealDTO {
    @IsInt({ message: 'mess_id must be an integer.' })
    mess_id: number;

    @IsInt({ message: 'user_id must be an integer.' })
    user_id: number;

    @IsDateString({}, { message: 'date must be a valid date.' })
    date: string;

    @IsOptional()
    @IsInt({ message: 'Lunch count must be a whole number.' })
    @Min(0, { message: 'Lunch count cannot be negative.' })
    lunch_count: number;

    @IsOptional()
    @IsInt({ message: 'Dinner count must be a whole number.' })
    @Min(0, { message: 'Dinner count cannot be negative.' })
    dinner_count: number;
}
