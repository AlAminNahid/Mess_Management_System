import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsDateString,
  IsString,
} from 'class-validator';

export class CreateExpenseIterationDTO {
  @IsInt({ message: 'member_id must be an integer.' })
  member_id: number;

  @IsInt({ message: 'mess_id must be an integer.' })
  mess_id: number;

  @IsNumber({}, { message: 'Amount must be a decimal number.' })
  amount: number;

  @IsDateString({}, { message: 'Date must be a valid date.' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty.' })
  description: string;

  @IsInt({ message: 'manager_id must be an integer.' })
  manager_id: number;
}
