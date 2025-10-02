import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExpenseCategory, MovementType } from './movements.enums';

@Schema({
  timestamps: true,
  collection: 'movements',
  versionKey: false,
})
export class Movement {
  @Prop({
    type: Date,
    required: true,
    get: (date: Date) => {
      if (!date) return null;
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(date));
    },
  })
  date: Date;

  @Prop({ type: String, required: true })
  dayOfWeek: string;

  @Prop({ type: String, enum: MovementType, required: true })
  type: MovementType;

  @Prop({ type: String, required: false })
  ownerId: string;

  @Prop({ type: String, required: false })
  ownerName: string;

  @Prop({ type: Boolean, default: false })
  isShop: boolean;

  @Prop({ type: Boolean, default: false })
  isCustomer: boolean;

  @Prop({ type: String, enum: ExpenseCategory, required: false })
  category: ExpenseCategory;

  @Prop({ type: String, required: false })
  userId: string; // expense employee id for salaries and income customer id for payments

  @Prop({ type: String, required: false })
  userName: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
MovementSchema.set('toJSON', { getters: true });
MovementSchema.set('toObject', { getters: true });
