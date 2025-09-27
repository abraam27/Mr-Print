import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { MovementType, ExpenseCategory } from '../movements.enums';

export class CreateMovementDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsEnum(MovementType)
  type: MovementType;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsBoolean()
  isShop: boolean;

  @IsBoolean()
  isCustomers: boolean;

  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @IsOptional()
  @IsString()
  subCategory?: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
