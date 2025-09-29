import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MovementType } from '../movements.enums';
import { ExpenseCategory } from '../movements.enums';

export class GetMovementDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(MovementType)
  type?: MovementType;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isShop?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isCustomers?: boolean;

  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;

  @IsOptional()
  @IsString()
  subCategory?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minAmount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxAmount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  pagination?: boolean;
}
