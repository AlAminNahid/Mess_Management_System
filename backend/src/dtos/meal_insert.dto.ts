import { IsNumber, IsPositive } from 'class-validator';

export class mealInsertDTO {
  @IsNumber()
  @IsPositive({
    message: `Meal count can't be a negative number`,
  })
  meal_count: number;

  @IsNumber()
  @IsPositive({
    message: `MemberID can't be a positive number`,
  })
  member_id: number;
}
