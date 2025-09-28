import { AttendanceLog } from '../attendance-logs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { GetAttendanceLogDto } from '../dtos/get-attendance-logs.dto';

@Injectable()
export class GetAttendanceLogsService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly attendanceLogsService: Model<AttendanceLog>,
  ) {}

  async getAttendanceLogs(query: GetAttendanceLogDto) {
    const filter: any = {};

    if (query.startDate || query.endDate) {
      filter.date = {};
      if (query.startDate) filter.date.$gte = new Date(query.startDate);
      if (query.endDate) filter.date.$lte = new Date(query.endDate);
    }
    if (query.time) filter.time = query.time;
    if (query.isHoliday !== undefined) filter.isHoliday = query.isHoliday;
    if (query.workType) filter.workType = query.workType;
    if (query.userId) filter.userId = query.userId;

    return this.attendanceLogsService.find(filter);
  }
}
