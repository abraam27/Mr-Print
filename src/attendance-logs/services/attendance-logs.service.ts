import { Injectable } from '@nestjs/common';
import { AttendanceLog } from '../attendance-logs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceLogDto } from '../dtos/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from '../dtos/update-attendance-log.dto';

@Injectable()
export class AttendanceLogsService {
  constructor(
    @InjectModel(AttendanceLog.name)
    private readonly userModel: Model<AttendanceLog>,
  ) {}

  async getAttendanceLogs(): Promise<AttendanceLog[]> {
    return await this.userModel.find();
  }

  getAttendanceLogById(id: string): Promise<AttendanceLog | null> {
    return this.userModel.findById(id);
  }

  async createAttendanceLog(
    user: CreateAttendanceLogDto,
  ): Promise<AttendanceLog> {
    return await this.userModel.create(user);
  }

  async updateAttendanceLog(
    id: string,
    user: UpdateAttendanceLogDto,
  ): Promise<AttendanceLog | null> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteAttendanceLog(id: string): Promise<AttendanceLog | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
