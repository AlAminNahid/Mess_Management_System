import { IsIn, IsOptional } from 'class-validator';

export class MealQueryDTO {
  @IsOptional()
  @IsIn(['current', 'last'])
  period?: 'current' | 'last';
}
