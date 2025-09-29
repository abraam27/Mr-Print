import { Injectable } from '@nestjs/common';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { sumBy } from 'src/common/helpers/sumBy.helper';
import { MovementType } from 'src/movements/movements.enums';

@Injectable()
export class GetReportService {
  constructor(private readonly getMovementsService: GetMovementsService) {}

  async getReport(month: number, year: number) {
    const customersIn = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      isCustomers: true,
      month,
      year,
    });
    const customersOut = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      isCustomers: true,
      month,
      year,
    });
    const shopIn = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      isShop: true,
      month,
      year,
    });
    const shopOut = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      isShop: true,
      month,
      year,
    });

    const totalCustomersIn = sumBy(customersIn, (movement) => movement.amount);
    const totalCustomersOut = sumBy(
      customersOut,
      (movement) => movement.amount,
    );
    const totalShopIn = sumBy(shopIn, (movement) => movement.amount);
    const totalShopOut = sumBy(shopOut, (movement) => movement.amount);

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
      totalCustomersOut,
      totalShopIn,
      totalShopOut,
      totalExpenses,
      grossProfit,
      given,
      netProfit,
    };
  }
}
