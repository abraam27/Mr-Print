import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsServices } from './services/index';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transactions.schema';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
@Module({
  controllers: [TransactionsController],
  providers: [...TransactionsServices],
  exports: [...TransactionsServices],
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
