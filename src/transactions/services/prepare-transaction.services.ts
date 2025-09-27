import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UsersService } from 'src/users/services/users.service';
import { PaperCostMap } from '../transactions.enums';

export class PrepareTransactionService {
  constructor(private readonly usersService: UsersService) {}

  async prepareTransaction(transaction: CreateTransactionDto) {
    const customer = transaction.customerId
      ? await this.usersService.getUserById(transaction.customerId)
      : null;

    const totalCost = this.calculateTotalCost(transaction);
    const totalPapersSales = this.calculateTotalSales(transaction);
    const grossProfit = this.calculateGrossProfit(
      totalPapersSales,
      totalCost,
      transaction.paid,
    );
    const employeeCommission = this.calculateEmployeeCommission(
      grossProfit,
      customer?.employeePercentage,
    );
    const netProfit = this.calculateNetProfit(grossProfit, employeeCommission);

    return this.buildTransaction(
      transaction,
      customer,
      totalCost,
      totalPapersSales,
      grossProfit,
      employeeCommission,
      netProfit,
    );
  }

  private calculateTotalCost(transaction: CreateTransactionDto): number | null {
    return transaction.numberOfPapers
      ? transaction.numberOfPapers * PaperCostMap[transaction.paperType]
      : null;
  }

  private calculateTotalSales(
    transaction: CreateTransactionDto,
  ): number | null {
    return transaction.numberOfPapers && transaction.paperSales
      ? transaction.numberOfPapers * transaction.paperSales
      : null;
  }

  private calculateGrossProfit(
    totalSales: number | null,
    totalCost: number | null,
    paid?: number,
  ): number {
    return totalSales && totalCost && paid ? totalSales - totalCost : 0;
  }

  private calculateEmployeeCommission(
    grossProfit: number,
    employeePercentage?: number,
  ): number {
    return grossProfit && employeePercentage
      ? grossProfit * employeePercentage
      : 0;
  }

  private calculateNetProfit(
    grossProfit: number,
    employeeCommission: number,
  ): number {
    return grossProfit && employeeCommission
      ? grossProfit - employeeCommission
      : 0;
  }

  private buildTransaction(
    transaction: CreateTransactionDto,
    customer: any,
    totalCost: number | null,
    totalSales: number | null,
    grossProfit: number,
    employeeCommission: number,
    netProfit: number,
  ) {
    return {
      ...transaction,
      employeePercentage: customer?.employeePercentage ?? null,
      paperCost: PaperCostMap[transaction.paperType],
      totalCost,
      totalPapersSales: totalSales,
      expectedPaid: totalSales,
      paid: transaction?.paid ?? 0,
      grossProfit,
      employeeCommission,
      netProfit,
      comment: transaction.comment,
    };
  }
}
