import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { UserRole } from 'src/users/users.enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  mobile: string[];

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  employeePercentage?: number;
}
