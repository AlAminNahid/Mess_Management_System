import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateMemberDTO {
  @IsInt({ message: 'mess_id must be an integer.' })
  mess_id: number;

  @IsInt({ message: 'user_id must be an integer.' })
  user_id: number;

  @IsOptional()
  @IsBoolean({ message: 'is_active must be either true or false.' })
  is_active: boolean;

  @IsDateString({}, { message: 'join_date must be a valid date.' })
  join_date: string;

  @IsOptional()
  @IsDateString({}, { message: 'leave_date must be a valid date.' })
  leave_date: string;
}
