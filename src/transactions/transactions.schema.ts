import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaperType } from './transactions.enums';

@Schema({
  timestamps: true,
  collection: 'transactions',
  versionKey: false,
})
export class Transaction {
  @Prop({ type: String, required: true })
  Date: string;

  @Prop({ type: String, required: false })
  customerId: string;

  @Prop({ type: Boolean, default: false, required: false })
  isShop: boolean;

  @Prop({ type: String, required: false })
  employeeId: string;

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

  @Prop({ type: Number, required: false })
  paid: number;

  @Prop({ type: Number, required: false })
  grossProfit: number;

  @Prop({ type: Number, required: false })
  employeeCommission: number;

  @Prop({ type: Number, required: false })
  netProfit: number;

  @Prop({ type: String, required: false })
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
