import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AttendanceTime, WorkType } from './attendance-logs.enums';

@Schema({
  timestamps: true,
  collection: 'attendance-logs',
  versionKey: false,
})
export class AttendanceLog {
  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, enum: AttendanceTime, required: true })
  time: AttendanceTime;

  @Prop({ type: Boolean, default: false, required: true })
  isHoliday: boolean;

  @Prop({ type: String, enum: WorkType, required: true })
  workType: WorkType;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: false })
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const AttendanceLogSchema = SchemaFactory.createForClass(AttendanceLog);
