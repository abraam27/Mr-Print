import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttendanceTime, WorkType } from '../attendance-logs.enums';
import { DateTime } from 'luxon';
import { Type } from 'class-transformer';

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

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isHoliday?: boolean;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateManyAttendanceLogDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttendanceLogDto)
  attendanceLogs: CreateAttendanceLogDto[];
}