import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { AttendanceLog } from '../attendance-logs.schema';
import { GetAttendanceLogDto } from '../dtos/get-attendance-logs.dto';

@Injectable()
export class GetAttendanceLogsService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly AttendanceLogModel: Model<AttendanceLog>,
  ) {}

  async getAttendanceLogs(query: GetAttendanceLogDto) {
    const { filter, options } = this.buildFilterFromQuery(query);
    return this.AttendanceLogModel.find(filter, null, options).exec();
  }

  buildFilterFromQuery(query: GetAttendanceLogDto): {
    filter: FilterQuery<AttendanceLog>;
    options: { skip?: number; limit?: number; sort?: any };
  } {
    const filter: FilterQuery<AttendanceLog> = {};
    const options: any = {};

    if (query.fromDate || query.toDate) {
      filter.date = {};
      if (query.fromDate) {
        filter.date.$gte = new Date(query.fromDate);
      }
      if (query.toDate) {
        filter.date.$lte = new Date(query.toDate);
      }
    }

    if (query.month && query.year) {
      const start = new Date(query.year, query.month - 1, 1);
      const end = new Date(query.year, query.month, 0, 23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    if (query.time) {
      filter.time = query.time;
    }

    if (query.isHoliday !== undefined) {
      filter.isHoliday = query.isHoliday;
    }

    if (query.workType) {
      filter.workType = query.workType;
    }

    if (query.userId) {
      filter.userId = query.userId;
    }

    // ✅ Apply pagination only if requested
    if (query.pagination) {
      const page = query.page ?? 1;
      const limit = query.limit ?? 20;
      options.skip = (page - 1) * limit;
      options.limit = limit;
    }

    // Default sorting
    if (query.sortBy) {
      options.sort = {
        [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1,
      };
    } else {
      options.sort = { date: -1 };
    }

    return { filter, options };
  }
}
