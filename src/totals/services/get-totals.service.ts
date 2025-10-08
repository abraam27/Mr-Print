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
import { calculateFridays } from 'src/common/helpers/fridaysCount.helper';
import { WorkType } from 'src/attendance-logs/attendance-logs.enums';

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
    const shifts = await this.calculateShifts(userId, month, year);
    let shiftsCost = 0;
    let overtimeCost = 0;
    let holidaysShiftsCost = 0;
    let holidaysOvertimeCost = 0;
    if (employee?.role == UserRole.Owner) {
      shiftsCost = shifts.shifts * OwnerShiftCostMap[WorkType.Shift];
      overtimeCost = shifts.overtime * OwnerShiftCostMap[WorkType.Overtime];
      holidaysShiftsCost = shifts.holidaysShifts * OwnerShiftCostMap[WorkType.Shift] * 2;
      holidaysOvertimeCost = shifts.holidaysOvertime * OwnerShiftCostMap[WorkType.Overtime] * 2;
    } else {
      shiftsCost = shifts.shifts * EmployeeShiftCostMap[WorkType.Shift];
      overtimeCost = shifts.overtime * EmployeeShiftCostMap[WorkType.Overtime];
      holidaysShiftsCost = shifts.holidaysShifts * EmployeeShiftCostMap[WorkType.Shift] * 2;
      holidaysOvertimeCost = shifts.holidaysOvertime * EmployeeShiftCostMap[WorkType.Overtime] * 2;
    }
    const total = shiftsCost + overtimeCost + holidaysShiftsCost + holidaysOvertimeCost;
    const totalFridays = 150 * (await calculateFridays(month, year)) || 600;
    return {
      shiftsCost,
      overtimeCost,
      holidaysShiftsCost,
      holidaysOvertimeCost,
      salary:
        employee?.role == UserRole.Employee ? total + totalFridays : total,
    };
  }

  async calculateShifts(userId: string, month: number, year: number) {
    const attendanceLogs =
      await this.getAttendanceLogsService.getAttendanceLogs({
        userId,
        month,
        year,
      });

    const counters = {
      shifts: 0,
      overtime: 0,
      holidaysShifts: 0,
      holidaysOvertime: 0,
    };

    for (const log of attendanceLogs) {
      const { isHoliday, workType } = log;

      if (workType === WorkType.Shift) {
        counters[isHoliday ? 'holidaysShifts' : 'shifts']++;
      } else if (workType === WorkType.Overtime) {
        counters[isHoliday ? 'holidaysOvertime' : 'overtime']++;
      }
    }

    return counters;
  }

  async calculateCommission(employeeId: string, month: number, year: number) {
    const transactions = await this.getTransactionsService.getTransactions({
      employeeId,
      month,
      year,
    });
    const commissions = transactions.map((transaction) => {
      const employeePercentage = transaction.employeePercentage ?? 0.1;
      const profit = transaction.totalPapersSales - transaction.totalCost;
      const commission = employeePercentage * profit;
      return commission;
    });
    return sumBy(commissions, (commission) => commission);
  }

  async calculateEmployeePaid(employeeId: string, month: number, year: number) {
    const movements = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      category: ExpenseCategory.Salary,
      userId: employeeId,
      month,
      year,
    });
    const total = sumBy(movements, (movement) => movement.amount);
    return total;
  }

  async calculateOwnerExpenses(ownerId: string, month: number, year: number) {
    const expenses = await this.getMovementsService.getMovements({
      type: MovementType.Expense,
      ownerId,
      month,
      year,
    });
    const total = sumBy(expenses, (movement) => movement.amount);
    return total;
  }

  async calculateOwnerIncome(ownerId: string, month: number, year: number) {
    const income = await this.getMovementsService.getMovements({
      type: MovementType.Income,
      userId: ownerId,
      month,
      year,
    });
    const total = sumBy(income, (movement) => movement.amount);
    return total;
  }
}
