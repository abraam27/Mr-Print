import { Injectable } from '@nestjs/common';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { sumBy } from 'src/common/helpers/sumBy.helper';
import { MovementType } from 'src/movements/movements.enums';
import { Movement } from 'src/movements/movements.schema';

@Injectable()
export class GetReportService {
  constructor(private readonly getMovementsService: GetMovementsService) {}

  async getReport(month: number, year: number) {
    const customersIn = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      isCustomer: true,
      month,
      year,
    });

    const shopIn = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      isShop: true,
      month,
      year,
    });

    const totalCustomersIn = sumBy(customersIn, (movement) => movement.amount);
    const totalShopIn = sumBy(shopIn, (movement) => movement.amount);

    const expenses = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      month,
      year,
    });

    const totalExpenses = sumBy(expenses, (movement) => movement.amount);

    const grossProfit = totalCustomersIn + totalShopIn - totalExpenses;
    const given = grossProfit * 0.1;
    const netProfit = grossProfit - given;

    return {
      totalCustomersIn,
      totalShopIn,
      totalIncome: totalCustomersIn + totalShopIn,
      totalExpenses,
      grossProfit,
      given,
      netProfit,
      ...this.summarizeExpenses(expenses),
    };
  }

  private summarizeExpenses(movements: Movement[]) {
    const summary: Record<string, number> = {};
  
    for (const move of movements) {
      if (!summary[move.category]) {
        summary[move.category] = 0;
      }
      summary[move.category] += move.amount;
    }
  
    return {
      expensesSummary: summary,
    };
  }
}
