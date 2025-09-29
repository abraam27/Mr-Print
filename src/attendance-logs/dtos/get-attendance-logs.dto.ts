import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceTime } from '../attendance-logs.enums';
import { WorkType } from '../attendance-logs.enums';

export class GetAttendanceLogDto {
  @IsOptional()
  @IsDateString()
  startDate?: string; // e.g. filter from this date (inclusive)

  @IsOptional()
  @IsDateString()
  endDate?: string; // e.g. filter to this date (inclusive)

  @IsOptional()
  @IsEnum(AttendanceTime)
  time?: AttendanceTime;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean) // ensures query string "true"/"false" is converted
  isHoliday?: boolean;

  @IsOptional()
  @IsEnum(WorkType)
  workType?: WorkType;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

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
}
