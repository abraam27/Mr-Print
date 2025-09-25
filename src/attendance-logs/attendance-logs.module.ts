import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance-logs.controller';
import { AttendanceLogsService } from './services/attendance-logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceLog, AttendanceLogSchema } from './attendance-logs.schema';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceLogsService],
  exports: [AttendanceLogsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttendanceLog.name,
        schema: AttendanceLogSchema,
      },
    ]),
  ]
})
export class AttendanceModule { }
