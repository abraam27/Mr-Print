import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transactions.schema';
import { CreateTransactionService } from './services/create-transaction.service';
import { UsersModule } from 'src/users/users.module';
import { PrepareTransactionService } from './services/prepare-transaction.services';
import { forwardRef } from '@nestjs/common';
@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    CreateTransactionService,
    PrepareTransactionService,
  ],
  exports: [TransactionsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
})
export class TransactionsModule {}
