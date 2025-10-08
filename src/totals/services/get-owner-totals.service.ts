import { Injectable } from '@nestjs/common';
import { GetTotalsService } from './get-totals.service';

@Injectable()
export class GetOwnerTotalsService {
  constructor(private readonly getTotalsService: GetTotalsService) {}

  async getOwnerTotals(ownerId: string, month: number, year: number) {
    const salaries = await this.getTotalsService.calculateSalary(ownerId, month, year);

    const shifts = await this.getTotalsService.calculateShifts(
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

    const difference = salaries.salary + commission - paid;
    const expenses = await this.getTotalsService.calculateOwnerExpenses(
      ownerId,
      month,
      year,
    );
    const income = await this.getTotalsService.calculateOwnerIncome(
      ownerId,
      month,
      year,
    );
    const profit = income - expenses;
    return {
      ...shifts,
      ...salaries,
      commission: Number(commission.toFixed(2)),
      totalSalary: Number((salaries.salary + commission).toFixed(2)),
      paid,
      difference,
      expenses,
      income,
      profit,
    };
  }
}
