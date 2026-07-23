import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsString()
  @MinLength(6, {
    message: `Password must be at least 6 characters.`,
  })
  password: string;
}

export class JoinMessDTO {
  @IsString()
  @IsNotEmpty({
    message: `Mess name can't be empty.`,
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: `Password can't be empty.`,
  })
  password: string;
}

export class ViewMessPasswordDTO {
  @IsString()
  @IsNotEmpty({
    message: `Account password can't be empty.`,
  })
  accountPassword: string;
}

export class ChangeMessPasswordDTO {
  @IsString()
  @IsNotEmpty({
    message: `Account password can't be empty.`,
  })
  accountPassword: string;

  @IsString()
  @MinLength(6, {
    message: `New mess password must be at least 6 characters.`,
  })
  newMessPassword: string;
}

export class TransferOwnershipDTO {
  @IsInt()
  @IsPositive()
  targetMemberId: number;
}

export class RemoveMemberDTO {
  @IsInt()
  @IsPositive()
  memberId: number;
}

export class DeleteMessDTO {
  @IsString()
  @IsNotEmpty({
    message: `Account password can't be empty.`,
  })
  accountPassword: string;
}
