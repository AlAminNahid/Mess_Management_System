import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class UserProfileUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^01[0-9]{9}$/, {
    message: 'Phone must be a valid 11 digit Bangladeshi number',
  })
  phone: string;
}
