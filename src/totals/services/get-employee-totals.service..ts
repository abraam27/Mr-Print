import { Injectable } from '@nestjs/common';
import { GetTotalsService } from './get-totals.service';

@Injectable()
export class GetEmployeeTotalsService {
  constructor(private readonly getTotalsService: GetTotalsService) {}

  async getEmployeeTotals(employeeId: string, month: number, year: number) {
    const salary = await this.getTotalsService.calculateSalary(
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

    const difference = salary + commission - paid;
    return {
      salary,
      commission,
      paid,
      difference,
    };
  }
}
