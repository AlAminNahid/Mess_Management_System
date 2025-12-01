import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessDTO {
  @IsString()
  @IsNotEmpty({
    message: `Mess name can't be empty.`,
  })
  @MaxLength(200, {
    message: `Mess name can't be greater than 200 characters.`,
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: `Address can't be empty.`,
  })
  address: string;
}
