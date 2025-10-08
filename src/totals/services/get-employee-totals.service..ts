import { Injectable } from '@nestjs/common';
import { GetTotalsService } from './get-totals.service';

@Injectable()
export class GetEmployeeTotalsService {
  constructor(private readonly getTotalsService: GetTotalsService) {}

  async getEmployeeTotals(employeeId: string, month: number, year: number) {
    const salaries = await this.getTotalsService.calculateSalary(employeeId, month, year);

    const shifts = await this.getTotalsService.calculateShifts(
      employeeId,
      month,
      year,
    );

    const commission = await this.getTotalsService.calculateCommission(
      employeeId,
      month,
      year,
    );

    const paid = await this.getTotalsService.calculateEmployeePaid(
      employeeId,
      month,
      year,
    );

    const difference = salaries.salary + commission - paid;
    return {
      ...shifts,
      ...salaries,
      commission,
      paid,
      difference,
    };
  }
}
