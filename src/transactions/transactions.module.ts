import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transactions.schema';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
  imports: [MongooseModule.forFeature([
    {
      name: Transaction.name,
      schema: TransactionSchema,
    },
  ])]
})
export class TransactionsModule { }
