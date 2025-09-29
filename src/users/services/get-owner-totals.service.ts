import { Injectable } from '@nestjs/common';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';
import { GetTransactionsService } from 'src/transactions/services/get-transactions.service';
import { sumBy } from 'src/common/helpers/sumBy.helper';
import { GetAttendanceLogsService } from 'src/attendance-logs/services/get-attendance-logs.service';
import { GetTotalsService } from 'src/users/services/get-totals.service';
import { ExpenseCategory, MovementType } from 'src/movements/movements.enums';

@Injectable()
export class GetOwnerTotalsService {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getMovementsService: GetMovementsService,
    private readonly getTransactionsService: GetTransactionsService,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
    private readonly getTotalsService: GetTotalsService,
  ) {}

  async getOwnerTotals(ownerId: string, month: number, year: number) {
    // shifts counts
    const salary = await this.getTotalsService.calculateSalary(
      ownerId,
      month,
      year,
    );
    // commission
    const commission = await this.getTotalsService.calculateCommission(
      ownerId,
      month,
      year,
    );
    // total
    const total = salary + commission;
    // paid
    const paid = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      subCategory: ExpenseCategory.Salary,
      userId: ownerId,
      month,
      year,
    });
    // difference
    const difference = salary + commission - sumBy(paid, (p) => p.amount);
    // expenses
    const expenses = this.getMovementsService.getMovements({
      userId: ownerId,
      month,
      year,
    });
    // expenses
    const expenses = this.getMovementsService.getMovements({
      userId: ownerId,
      month,
      year,
    });
    // profit income
    const profitIncome = this.getMovementsService.getMovements({
      userId: ownerId,
      month,
      year,
    });
    // difference
    const profitDifference = this.getMovementsService.getMovements({
      userId: ownerId,
      month,
      year,
    });
  }

}
