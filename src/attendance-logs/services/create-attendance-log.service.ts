import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { UUID } from 'src/common/helpers/uuid.helpers';
import { getWeekday } from 'src/common/helpers/date-format.helpers';

@Injectable()
export class CreateAttendanceLogService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly userModel: Model<AttendanceLog>,
  ) {}

  async createAttendanceLog(createAttendanceLogDto: CreateAttendanceLogDto) {
    const id = UUID(
      `${createAttendanceLogDto.userId}-${createAttendanceLogDto.date}-${createAttendanceLogDto.time}`,
    );
    const dayOfWeek = getWeekday(createAttendanceLogDto.date);
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
}
