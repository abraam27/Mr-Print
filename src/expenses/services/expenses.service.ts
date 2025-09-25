import { Injectable } from '@nestjs/common';
import { Expense } from '../expenses.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from '../dtos/create-expense.dto';
import { UpdateExpenseDto } from '../dtos/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly userModel: Model<Expense>,
  ) {}

  async getExpenses(): Promise<Expense[]> {
    return await this.userModel.find();
  }

  getExpenseById(id: string): Promise<Expense | null> {
    return this.userModel.findById(id);
  }

  async createExpense(expense: CreateExpenseDto): Promise<Expense> {
    return await this.userModel.create(expense);
  }

  async updateExpense(
    id: string,
    expense: UpdateExpenseDto,
  ): Promise<Expense | null> {
    return await this.userModel.findByIdAndUpdate(id, expense, { new: true });
  }

  async deleteExpense(id: string): Promise<Expense | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
