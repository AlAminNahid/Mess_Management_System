import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class NoticeDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title : string;

    @IsString()
    @IsNotEmpty()
    description : string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    notice_type : string;
}