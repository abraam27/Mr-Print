import {
  IsEnum,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { MovementType, ExpenseCategory } from '../movements.enums';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class CreateMovementDto {
  @Transform(({ value }) => {
    return DateTime.fromFormat(value, 'dd/MM/yyyy', { zone: 'utc' }).toJSDate();
  })
  @IsDate()
  date: Date;

  @IsEnum(MovementType)
  type: MovementType;

  @IsString()
  @IsOptional()
  ownerId?: string;

  @IsBoolean()
  @IsOptional()
  isShop?: boolean;

  @IsBoolean()
  @IsOptional()
  isCustomer?: boolean;

  @IsEnum(ExpenseCategory)
  @IsOptional()
  category: ExpenseCategory;

  @IsString()
  @IsOptional()
  userId?: string; // expense employee id for salaries and income customer id for payments

  @IsNumber()
  amount: number;
}
