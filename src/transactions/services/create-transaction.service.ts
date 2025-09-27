import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../transactions.schema';
import { Model } from 'mongoose';
import { PrepareTransactionService } from './prepare-transaction.services';

@Injectable()
export class CreateTransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    private readonly prepareTransactionService: PrepareTransactionService,
  ) {}

  async createTransaction(transaction: CreateTransactionDto) {
    const updatedTransaction =
      this.prepareTransactionService.prepareTransaction(transaction);

    return await this.transactionModel.create(updatedTransaction);
  }
}
