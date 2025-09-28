import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AttendanceTime, WorkType } from '../attendance-logs.enums';

export class CreateAttendanceLogDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsEnum(AttendanceTime)
  time: AttendanceTime;

  @IsNotEmpty()
  @IsEnum(WorkType)
  workType: WorkType;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
