import { Injectable } from '@nestjs/common';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { GetTransactionsService } from 'src/transactions/services/get-transactions.service';
import { sumBy } from 'src/common/helpers/sumBy.helper';
import { MovementType } from 'src/movements/movements.enums';

@Injectable()
export class GetCustomerTotalsService {
  constructor(
    private readonly getMovementsService: GetMovementsService,
    private readonly getTransactionsService: GetTransactionsService,
  ) {}

  async getCustomerTotals(customerId: string, month: number, year: number) {
    const transactions = await this.getTransactionsService.getTransactions({
      customerId,
      month,
      year,
    });

    const movements = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      userId: customerId,
      month,
      year,
    });

    // Transactions totals
    const totalExpectedPaid = sumBy(transactions, (t) => t.expectedPaid);
    const totalPapers = sumBy(transactions, (t) => t.numberOfPapers);
    const totalPapersCost = sumBy(transactions, (t) => t.totalCost);
    const totalPapersSales = sumBy(transactions, (t) => t.totalPapersSales);

    // Movements totals
    const totalActualPaid = sumBy(movements, (m) => m.amount);

    // Calculations
    const difference = totalExpectedPaid - totalActualPaid;
    const totalProfit = totalPapersSales - totalPapersCost;
    const commissionRate = 0.1;
    const employeeCommission = totalProfit * commissionRate;
    const netProfit = totalProfit - employeeCommission;

    return {
      totalExpectedPaid,
      totalActualPaid,
      difference,
      totalPapers,
      totalPapersCost,
      totalPapersSales,
      totalProfit,
      employeeCommission,
      netProfit,
    };
  }
}
