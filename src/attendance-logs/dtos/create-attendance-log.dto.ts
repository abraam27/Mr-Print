import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AttendanceTime, WorkType } from '../attendance-logs.enums';
import { Transform } from 'class-transformer';

export class CreateAttendanceLogDto {
  @IsNotEmpty()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
  })
  date: Date;

  @IsNotEmpty()
  @IsEnum(AttendanceTime)
  time: AttendanceTime;

  @IsBoolean()
  @IsOptional()
  isHoliday: boolean;

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
