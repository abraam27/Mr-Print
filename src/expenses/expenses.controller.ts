import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
  @Get('')
  public getExpenses() {
    return this.expensesService.getExpenses();
  }

  @Get('/:id')
  public getExpense(@Param('id') id: string) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  public createExpense(
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Put('/:id')
  public updateExpense(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.updateExpense(id, updateExpenseDto);
  }

  @Delete('/:id')
  public deleteExpense(@Param('id') id: string) {
    return this.expensesService.deleteExpense(id);
  }
}
