import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { uuid } from 'src/common/helpers/uuid.helpers';
import { DateTime } from 'luxon';

@Injectable()
export class CreateAttendanceLogService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly userModel: Model<AttendanceLog>,
  ) {}

  async createAttendanceLog(createAttendanceLogDto: CreateAttendanceLogDto) {
    const id = uuid(
      `${createAttendanceLogDto.userId}-${createAttendanceLogDto.date.toISOString()}-${createAttendanceLogDto.time}`,
    );
    console.log(createAttendanceLogDto.date);
    const dayOfWeek = this.getWeekday(
      createAttendanceLogDto.date.toISOString(),
    );
    const attendanceLog = {
      ...createAttendanceLogDto,
      date: new Date(createAttendanceLogDto.date),
      isHoliday: dayOfWeek === 'Friday',
    };
    return this.userModel.findOneAndUpdate({ id }, attendanceLog, {
      upsert: true,
      new: true,
    });
  }

  private getWeekday(dateIso: string): string {
    return DateTime.fromISO(dateIso, { zone: 'utc' }).toFormat('EEEE');
  }
}
