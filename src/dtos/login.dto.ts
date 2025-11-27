import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class loginDTO{
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
    @MinLength(6, { 
        message: 'Password must be at least 6 characters long' 
    })
    @Matches(/^.*(?=[@#$&]).*$/, {
        message : 'Password must contain any of this (@ or # or $ or &) speical characters'
    })
    password : string;
}