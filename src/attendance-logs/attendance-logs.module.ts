import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance-logs.controller';
import { AttendanceLogsService } from './services/attendance-logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceLog, AttendanceLogSchema } from './attendance-logs.schema';
import { CreateAttendanceLogService } from './services/create-attendance-log.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceLogsService, CreateAttendanceLogService],
  exports: [AttendanceLogsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttendanceLog.name,
        schema: AttendanceLogSchema,
      },
    ]),
  ],
})
export class AttendanceLogsModule {}
