import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from '../users.enums';
import { Type } from 'class-transformer';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year?: number;
}
