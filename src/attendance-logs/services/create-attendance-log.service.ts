import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { DateTime } from 'luxon';

@Injectable()
export class CreateAttendanceLogService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly userModel: Model<AttendanceLog>,
  ) {}

  async createAttendanceLog(
    createAttendanceLogDto: CreateAttendanceLogDto,
  ): Promise<AttendanceLog> {
    const dayOfWeek = DateTime.fromJSDate(createAttendanceLogDto.date).toFormat(
      'EEEE',
    );
    const attendanceLog = {
      ...createAttendanceLogDto,
      isHoliday: dayOfWeek === 'Friday',
    };
    return this.userModel.create(attendanceLog);
  }
}
