import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { CreateManyAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { CreateAttendanceLogService } from './create-attendance-log.service';

@Injectable()
export class CreateManyAttendanceLogsService {
  constructor(
    private readonly createAttendanceLogService: CreateAttendanceLogService,
  ) {}

  async createManyAttendanceLog(
    createAttendanceLogDto: CreateManyAttendanceLogDto,
  ) {
    const results = await Promise.all(
      createAttendanceLogDto.attendanceLogs.map(async (log) => {
        return this.createAttendanceLogService.createAttendanceLog(log);
      }),
    );

    return results;
  }
}
