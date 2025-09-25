import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './users.enums';

@Schema({
  timestamps: true,
  collection: 'users',
  versionKey: false,
})
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: [String], required: true })
  mobile: string[];

  @Prop({ type: String, required: false })
  password: string;

  @Prop({
    type: String,
    enum: UserRole,
    required: true,
    default: UserRole.Customer,
  })
  role: UserRole;

  @Prop({ type: String, required: false })
  employeeId?: string;

  @Prop({ type: Number, required: false, default: 0.1 })
  employeePercentage?: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
