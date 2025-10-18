import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { CreateTransactionService } from './create-transaction.service';
import { GetTransactionsService } from './get-transactions.service';
import { GetTransactionDto } from '../dtos/get-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly userModel: Model<Transaction>,
    private readonly createTransactionService: CreateTransactionService,
    private readonly getTransactionsService: GetTransactionsService
  ) {}

  async getTransactions(getTransactionDto: GetTransactionDto): Promise<Transaction[]> {
    return await this.getTransactionsService.getTransactions(getTransactionDto);
  }

  getTransactionById(id: string): Promise<Transaction | null> {
    return this.userModel.findById(id);
  }

  async createTransaction(
    transaction: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.createTransactionService.createTransaction(transaction);
  }

  async updateTransaction(
    id: string,
    transaction: UpdateTransactionDto,
  ): Promise<Transaction | null> {
    return await this.userModel.findByIdAndUpdate(id, transaction, {
      new: true,
    });
  }

  async deleteTransaction(id: string): Promise<Transaction | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
