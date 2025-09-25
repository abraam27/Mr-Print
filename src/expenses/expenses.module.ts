import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './services/expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expenses.schema';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
  imports: [MongooseModule.forFeature([
    {
      name: Expense.name,
      schema: ExpenseSchema,
    },
  ])]
})
export class ExpensesModule { }
