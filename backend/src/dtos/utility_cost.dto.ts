import { IsInt, IsNumber, IsPositive } from "class-validator";

export class utilityCostDTO{
    @IsInt()
    @IsPositive()
    mess_id : number;

    @IsNumber()
    @IsPositive()
    rent : number;

    @IsNumber()
    @IsPositive()
    internet : number;

    @IsNumber()
    @IsPositive()
    electricity : number;

    @IsNumber()
    @IsPositive()
    maid : number;

    @IsNumber()
    @IsPositive()
    gas : number;
}