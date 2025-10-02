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

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.prepareTransactionService.prepareTransaction(createTransactionDto);
    return await this.transactionModel.create(transaction);
  }
}
