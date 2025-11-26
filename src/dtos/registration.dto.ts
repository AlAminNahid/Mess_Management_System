import { IsNotEmpty, IsOptional, IsString, MaxLength, IsIn, IsBoolean, Matches } from "class-validator";

export class registrationDTO{
    @IsString()
    @IsNotEmpty({
        message : `Name can't be empty.`
    })
    @MaxLength(200, {
        message : `Name length can't be greater then 200`
    })
    @Matches(/^[A-Za-z ]+$/, {
        message : `Name can't contain any number`
    })
    name : string;

    @IsString()
    @IsNotEmpty({
        message : `Email can't be empty.`
    })
    @Matches(/^[a-z0-9.]+@gmail.com$/, {
        message : 'Email must contain @gmail.com at the end and all the character should be in lower case'
    })
    email : string;
    
    @IsString()
    @IsNotEmpty({
        message : `Password can't be empty.`
    })
    @Matches(/^.*(?=[@#$&]).*$/, {
        message : 'Password must contain any of this (@ or # or $ or &) speical characters'
    })
    password : string;

    @IsOptional()
    @IsString()
    @IsIn(['manager', 'member', 'admin'], {
        message : 'Role can only contain manager, member and admin'
    })
    role : string;

    @IsOptional()
    @IsBoolean()
    @IsIn([true, false], {
        message : 'is_active can only contain true or false'
    })
    is_active : boolean;

    @IsString()
    @Matches(/^\d{14}$/, {
        message : 'Nid must contain 14 digits & only numbers'
    })
    nid : string;

    @IsString()
    @Matches(/^01[0-9]+$/, {
        message : 'Phone number should only contain numbers & should start with 01'
    })
    @MaxLength(11, {
        message : 'Phone number should be only 11 digits'
    })
    phone : string;
}