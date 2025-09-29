import { Injectable } from '@nestjs/common';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';
import { GetTransactionsService } from 'src/transactions/services/get-transactions.service';
import { sumBy } from 'src/common/helpers/sumBy.helper';

@Injectable()
export class GetCustomerTotalsService {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getMovementsService: GetMovementsService,
    private readonly getTransactionsService: GetTransactionsService,
  ) {}

  async calculateCustomerTotals(
    customerId: string,
    month: number,
    year: number,
  ) {
    const customer = await this.getUserByIdService.getUserById(customerId);

    const transactions = await this.getTransactionsService.getTransactions({
      customerId,
      month,
      year,
    });

    const movements = await this.getMovementsService.getMovements({
      userId: customerId,
      month,
      year,
    });

    // Transactions totals
    const totalExpectedPaid = sumBy(transactions, (t) => t.expectedPaid);
    const totalPapers = sumBy(transactions, (t) => t.numberOfPapers);
    const totalPapersCost = sumBy(transactions, (t) => t.paperCost);
    const totalPapersSales = sumBy(transactions, (t) => t.paperSales);

    // Movements totals
    const totalActualPaid = sumBy(movements, (m) => m.amount);

    // Calculations
    const difference = totalExpectedPaid - totalActualPaid;
    const totalProfit = totalPapersSales - totalPapersCost;
    const commissionRate = (customer?.employeePercentage ?? 0.1) / 100;
    const commission = totalProfit * commissionRate;
    const netProfit = totalProfit + commission;

    return {
      totalExpectedPaid,
      totalActualPaid,
      difference,
      totalPapers,
      totalPapersCost,
      totalPapersSales,
      totalProfit,
      commission,
      netProfit,
    };
  }
}
