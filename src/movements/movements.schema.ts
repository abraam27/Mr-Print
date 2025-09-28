import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExpenseCategory, MovementType } from './movements.enums';

@Schema({
  timestamps: true,
  collection: 'movements',
  versionKey: false,
})
export class Movement {
  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, enum: MovementType, required: true })
  type: MovementType;

  @Prop({ type: String, required: false })
  ownerId: string;

  @Prop({ type: Boolean, default: false })
  isShop: boolean;

  @Prop({ type: Boolean, default: false })
  isCustomer: boolean;

  @Prop({ type: String, enum: ExpenseCategory, required: true })
  expenseCategory: ExpenseCategory;

  @Prop({ type: String, required: false })
  userId: string; // expense employee id for salaries and income customer id for payments

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
