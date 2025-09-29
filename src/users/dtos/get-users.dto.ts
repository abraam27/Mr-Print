import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from '../users.enums';

export class FindUsersDto {
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
  @IsNumber()
  month?: number;

  @IsOptional()
  @IsNumber()
  year?: number;
}
