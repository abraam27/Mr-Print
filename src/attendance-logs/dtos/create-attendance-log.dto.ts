import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AttendanceTime, WorkType } from '../attendance-logs.enums';
import { DateTime } from 'luxon';

export class CreateAttendanceLogDto {
  @Transform(({ value }) => {
    return DateTime.fromFormat(value, 'dd/MM/yyyy', { zone: 'utc' }).toJSDate();
  })
  @IsDate()
  date: Date;

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

export class CreateManyAttendanceLogDto {
  attendanceLogs: CreateAttendanceLogDto[];
}
