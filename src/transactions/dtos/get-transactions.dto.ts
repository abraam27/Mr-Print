import {
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaperType } from '../transactions.enums';
import { TransactionStatus } from '../transactions.enums';

export class GetTransactionDto {
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsEnum(PaperType)
  paperType?: PaperType;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isShop?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPaperCost?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPaperCost?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minTotalCost?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxTotalCost?: number;

  @IsOptional()
  @IsString()
  fromDate?: string;

  @IsOptional()
  @IsString()
  toDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  pagination?: boolean;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
