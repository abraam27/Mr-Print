import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetAttendanceLogsService } from 'src/attendance-logs/services/get-attendance-logs.service';
import {
  EmployeeShiftCostMap,
  OwnerShiftCostMap,
} from 'src/attendance-logs/attendance-logs.constants';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';
import { UserRole } from 'src/users/users.enums';
import { GetTransactionsService } from 'src/transactions/services/get-transactions.service';
import { ExpenseCategory, MovementType } from 'src/movements/movements.enums';
import { sumBy } from 'src/common/helpers/sumBy.helper';

@Injectable()
export class GetTotalsService {
  constructor(
    @Inject(forwardRef(() => GetUserByIdService))
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
    private readonly getMovementsService: GetMovementsService,
    private readonly getTransactionsService: GetTransactionsService,
  ) {}

  async calculateSalary(userId: string, month: number, year: number) {
    const employee = await this.getUserByIdService.getUserById(userId);
    const attendanceLogs =
      await this.getAttendanceLogsService.getAttendanceLogs({
        userId,
        month,
        year,
      });
    const logsWithCost = attendanceLogs.map((log) => {
      const baseCost =
        employee?.role == UserRole.Owner
          ? OwnerShiftCostMap[log.workType]
          : (EmployeeShiftCostMap[log.workType] ?? 0);
      const cost = log.isHoliday ? baseCost * 2 : baseCost;
      return { ...log, cost };
    });

    const total = sumBy(logsWithCost, (log) => log.cost);
    return employee?.role == UserRole.Employee ? total + 600 : total;
  }

  async calculateCommission(employeeId: string, month: number, year: number) {
    const transactions = await this.getTransactionsService.getTransactions({
      employeeId,
      month,
      year,
    });
    const commissions = transactions.map((transaction) => {
      const employeePercentage = transaction.employeePercentage / 100;
      const profit = transaction.totalPapersSales - transaction.totalCost;
      const commission = employeePercentage * profit;
      return commission;
    });
    return sumBy(commissions, (commission) => commission);
  }

  async calculateEmployeePaid(employeeId: string, month: number, year: number) {
    const movements = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      subCategory: ExpenseCategory.Salary,
      userId: employeeId,
      month,
      year,
    });
    const total = sumBy(movements, (movement) => movement.amount);
    return total;
  }

  async calculateOwnerExpenses(ownerId: string) {
    const expenses = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      ownerId,
      month: 0,
      year: 0,
    });
    const total = sumBy(expenses, (movement) => movement.amount);
    return total;
  }

  async calculateOwnerIncome(ownerId: string) {
    const income = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      userId: ownerId,
      month: 0,
      year: 0,
    });
    const total = sumBy(income, (movement) => movement.amount);
    return total;
  }
}
