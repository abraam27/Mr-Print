import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { uuid } from 'src/common/helpers/uuid.helpers';
import { DateTime } from 'luxon';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';

@Injectable()
export class CreateAttendanceLogService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly attendanceLogModel: Model<AttendanceLog>,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async createAttendanceLog(createAttendanceLogDto: CreateAttendanceLogDto) {
    const user = await this.getUserByIdService.getUserById(createAttendanceLogDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const id = uuid(
      `${createAttendanceLogDto.userId}-${createAttendanceLogDto.date.toISOString()}-${createAttendanceLogDto.time}`,
    );

    const dayOfWeek = this.getWeekday(
      createAttendanceLogDto.date.toISOString(),
    );

    const attendanceLog = {
      ...createAttendanceLogDto,
      date: new Date(createAttendanceLogDto.date),
      isHoliday: dayOfWeek === 'Friday',
    };
    
    return this.attendanceLogModel.findOneAndUpdate({ id }, attendanceLog, {
      upsert: true,
      new: true,
    });
  }

  private getWeekday(dateIso: string): string {
    return DateTime.fromISO(dateIso, { zone: 'utc' }).toFormat('EEEE');
  }
}
