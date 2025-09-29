import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance-logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceLog, AttendanceLogSchema } from './attendance-logs.schema';
import { AttendanceLogsServices } from './services/index';
import { UsersModule } from '../users/users.module';
import { forwardRef } from '@nestjs/common';
@Module({
  controllers: [AttendanceController],
  providers: [...AttendanceLogsServices],
  exports: [...AttendanceLogsServices],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttendanceLog.name,
        schema: AttendanceLogSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
})
export class AttendanceLogsModule {}
