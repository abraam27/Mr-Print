import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from '../dtos/update-attendance-log.dto';
import { CreateAttendanceLogService } from './create-attendance-log.service';
import { GetAttendanceLogsService } from './get-attendance-logs.service';
import { QueryAttendanceLogDto } from '../dtos/get-attendance-logs.dto';

@Injectable()
export class AttendanceLogsService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly userModel: Model<AttendanceLog>,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
    private readonly createAttendanceLogService: CreateAttendanceLogService,
  ) {}

  async getAttendanceLogs(query: QueryAttendanceLogDto) {
    return await this.getAttendanceLogsService.getAttendanceLogs(query);
  }

  getAttendanceLogById(id: string) {
    return this.userModel.findById(id);
  }

  async createAttendanceLog(user: CreateAttendanceLogDto) {
    return await this.createAttendanceLogService.createAttendanceLog(user);
  }

  async updateAttendanceLog(id: string, user: UpdateAttendanceLogDto) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteAttendanceLog(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
