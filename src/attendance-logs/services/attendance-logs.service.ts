import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateAttendanceLogDto,
  CreateManyAttendanceLogDto,
} from '../dtos/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from '../dtos/update-attendance-log.dto';
import { CreateAttendanceLogService } from './create-attendance-log.service';
import { GetAttendanceLogDto } from '../dtos/get-attendance-logs.dto';
import { GetAttendanceLogsService } from './get-attendance-logs.service';
import { CreateManyAttendanceLogsService } from './create--many-attendance-log.service';

@Injectable()
export class AttendanceLogsService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly attendanceLogModel: Model<AttendanceLog>,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
    private readonly createAttendanceLogService: CreateAttendanceLogService,
    private readonly createManyAttendanceLogService: CreateManyAttendanceLogsService,
  ) {}

  async getAttendanceLogs(query: GetAttendanceLogDto) {
    return await this.getAttendanceLogsService.getAttendanceLogs(query);
  }

  async getAttendanceLogById(id: string) {
    return await this.attendanceLogModel.findById(id);
  }

  async createAttendanceLog(createAttendanceLogDto: CreateAttendanceLogDto) {
    return await this.createAttendanceLogService.createAttendanceLog(
      createAttendanceLogDto,
    );
  }

  async createManyAttendanceLog(
    createManyAttendanceLogDto: CreateManyAttendanceLogDto,
  ) {
    return await this.createManyAttendanceLogService.createManyAttendanceLog(
      createManyAttendanceLogDto,
    );
  }

  async updateAttendanceLog(
    id: string,
    updateAttendanceLogDto: UpdateAttendanceLogDto,
  ) {
    return await this.attendanceLogModel.findByIdAndUpdate(
      id,
      updateAttendanceLogDto,
      {
        new: true,
      },
    );
  }

  async deleteAttendanceLog(id: string) {
    return await this.attendanceLogModel.findByIdAndDelete(id);
  }
}
