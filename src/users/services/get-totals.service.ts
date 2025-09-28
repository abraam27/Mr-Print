import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetAttendanceLogsService } from 'src/attendance-logs/services/get-attendance-logs.service';
import { filterLogsByMonthYear } from 'src/common/helpers/date-format.helpers';
import { EmployeeShiftCostMap, OwnerShiftCostMap } from 'src/attendance-logs/attendance-logs.constants';
import { GetMovementsService } from 'src/movements/services/get-movements.service';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';
import { UserRole } from 'src/users/users.enums';
import { GetTransactionsService } from 'src/transactions/services/get-transactions.service';

@Injectable()
export class GetTotalsService {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
    private readonly getMovementsService: GetMovementsService,
    private readonly getTransactionsService: GetTransactionsService,
  ) { }

  async calculateSalary(userId: string, month: string, year: string) {
    const employee = await this.getUserByIdService.getUserById(userId);
    const attendanceLogs = await this.getAttendanceLogsService.getAttendanceLogs({
      userId: userId,
    });
    const filteredLogsByMonthYear = filterLogsByMonthYear(attendanceLogs, Number(month), Number(year));
    const logsWithCost = filteredLogsByMonthYear.map(log => {
      const baseCost = employee?.role == UserRole.Owner ? OwnerShiftCostMap[log.workType] : EmployeeShiftCostMap[log.workType] ?? 0;
      const cost = log.isHoliday ? baseCost * 2 : baseCost;
      return { ...log, cost };
    });

    const total = logsWithCost.reduce((sum, log) => sum + log.cost, 0);
    return employee?.role == UserRole.Employee ? total + 600 : total;
  }

  async calculateOwnerExpenses(ownerId: string, month: string, year: string) {
    const movements = await this.getMovementsService.getMovements({
      ownerId: ownerId,
    });
    const filteredMovementsByMonthYear = filterLogsByMonthYear(movements, Number(month), Number(year));
    const total = filteredMovementsByMonthYear.reduce((sum, movement) => sum + movement.amount, 0);
    return total;
  }

  async calculateCommission(employeeId: string, month: string, year: string) {
    const transactions = await this.getTransactionsService.getTransactions({
      employeeId: employeeId,
    });
    const filteredTransactionsByMonthYear = filterLogsByMonthYear(transactions, Number(month), Number(year));
    const commissions = filteredTransactionsByMonthYear.map((transaction) => {
      const employeePercentage = transaction.employeePercentage / 100;
      const profit = transaction.totalPapersSales - transaction.totalCost;
      const commission = employeePercentage * profit;
      return commission;
    });
    return commissions.reduce((sum, commission) => sum + commission, 0);
  }
}
