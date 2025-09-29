import { Injectable } from '@nestjs/common';
import { GetTotalsService } from './get-totals.service';

@Injectable()
export class GetOwnerTotalsService {
  constructor(private readonly getTotalsService: GetTotalsService) {}

  async getOwnerTotals(ownerId: string, month: number, year: number) {
    const salary = await this.getTotalsService.calculateSalary(
      ownerId,
      month,
      year,
    );

    const commission = await this.getTotalsService.calculateCommission(
      ownerId,
      month,
      year,
    );

    const paid = await this.getTotalsService.calculateEmployeePaid(
      ownerId,
      month,
      year,
    );

    const difference = salary + commission - paid;
    const expenses =
      await this.getTotalsService.calculateOwnerExpenses(ownerId);
    const income = await this.getTotalsService.calculateOwnerIncome(ownerId);
    const profit = income - expenses;
    return {
      salary,
      commission,
      paid,
      difference,
      expenses,
      income,
      profit,
    };
  }
}
