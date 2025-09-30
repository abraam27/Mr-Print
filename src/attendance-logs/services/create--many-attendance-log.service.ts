import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { uuid } from 'src/common/helpers/uuid.helpers';
import { DateTime } from 'luxon';
import { CreateManyAttendanceLogDto } from '../dtos/create-attendance-log.dto';

@Injectable()
export class CreateManyAttendanceLogsService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly userModel: Model<AttendanceLog>,
  ) {}

  async createManyAttendanceLog(
    createAttendanceLogDto: CreateManyAttendanceLogDto,
  ) {
    const results = await Promise.all(
      createAttendanceLogDto.attendanceLogs.map(async (log) => {
        const parsedDate = DateTime.fromISO(log.date).toJSDate();

        const id = uuid(
          `${log.userId}-${parsedDate.toISOString()}-${log.time}`,
        );
        const dayOfWeek = this.getWeekday(parsedDate.toISOString() as string);

        const attendanceLog = {
          ...log,
          date: parsedDate,
          isHoliday: dayOfWeek === 'Friday',
        };

        return this.userModel.findOneAndUpdate({ id }, attendanceLog, {
          upsert: true,
          new: true,
        });
      }),
    );

    return results;
  }
  private getWeekday(dateIso: string): string {
    return DateTime.fromISO(dateIso, { zone: 'utc' }).toFormat('EEEE');
  }
}
