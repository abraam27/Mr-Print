import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ExpenseCategory } from '../expenses.enums';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  date: string;

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