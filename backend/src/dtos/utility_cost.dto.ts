import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class utilityCostDTO {
  @IsInt()
  @IsPositive()
  mess_id: number;

  @IsNumber()
  @Min(0)
  internet: number;

  @IsNumber()
  @Min(0)
  electricity: number;

  @IsNumber()
  @Min(0)
  maid: number;

  @IsNumber()
  @Min(0)
  gas: number;
}
