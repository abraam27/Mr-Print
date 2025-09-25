import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';

@Controller('users')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Get('')
  public getTransactions() {
    return this.transactionsService.getTransactions();
  }

  @Get('/:id')
  public getTransaction(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  public createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Put('/:id')
  public updateTransaction(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.updateTransaction(id, updateTransactionDto);
  }

  @Delete('/:id')
  public deleteTransaction(@Param('id') id: string) {
    return this.transactionsService.deleteTransaction(id);
  }
}
