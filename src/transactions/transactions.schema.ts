import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaperType, TransactionStatus } from './transactions.enums';

@Schema({
  timestamps: true,
  collection: 'transactions',
  versionKey: false,
})
export class Transaction {
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

  @Prop({ type: String, required: false })
  customerId: string;

  @Prop({ type: String, required: false })
  customerName: string;

  @Prop({ type: String, required: false })
  employeeId: string;

  @Prop({ type: String, required: false })
  employeeName: string;

  @Prop({ type: Number, required: false })
  employeePercentage: number;

  @Prop({ type: Number, required: false })
  numberOfPapers: number;

  @Prop({ type: String, enum: PaperType, required: true })
  paperType: PaperType;

  @Prop({ type: Number, required: false })
  paperCost: number;

  @Prop({ type: Number, required: false })
  totalCost: number;

  @Prop({ type: Number, required: false })
  paperSales: number;

  @Prop({ type: Number, required: false })
  totalPapersSales: number;

  @Prop({ type: Number, required: false })
  expectedPaid: number;

  @Prop({
    type: String,
    enum: TransactionStatus,
    default: TransactionStatus.Pending,
    required: false,
  })
  status: TransactionStatus;

  @Prop({ type: String, required: false })
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.set('toJSON', { getters: true });
TransactionSchema.set('toObject', { getters: true });
