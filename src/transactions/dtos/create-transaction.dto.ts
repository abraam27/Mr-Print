import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';
import { PaperType, TransactionStatus } from '../transactions.enums';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class CreateTransactionDto {
  @Transform(({ value }) => {
    return DateTime.fromFormat(value, 'dd/MM/yyyy', { zone: 'utc' }).toJSDate();
  })
  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  customerId?: string;

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
  expectedPaid?: number;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @IsString()
  @IsOptional()
  comment?: string;
}
