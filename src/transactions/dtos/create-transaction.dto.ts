import { IsString, IsBoolean, IsNumber, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { PaperType } from '../transactions.enums';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  Date: string;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsBoolean()
  @IsOptional()
  isShop: boolean;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsNumber()
  @IsOptional()
  numberOfPapers?: number;

  @IsEnum(PaperType)
  paperType: PaperType;

  @IsNumber()
  @IsOptional()
  paperSales?: number;

  @IsNumber()
  @IsOptional()
  totalPapersSales?: number;

  @IsNumber()
  @IsOptional()
  paid?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
