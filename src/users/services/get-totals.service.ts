import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetAttendanceLogsService } from 'src/attendance-logs/services/get-attendance-logs.service';
import { filterLogsByMonthYear } from 'src/common/helpers/date-format.helpers';
import { OwnerShiftCostMap } from 'src/attendance-logs/attendance-logs.constants';

@Injectable()
export class GetTotalsService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
  ) { }

  async calculateSalary(ownerId: string, month: string, year: string) {
    const attendanceLogs = await this.getAttendanceLogsService.getAttendanceLogs({
      userId: ownerId,
    });
    const filteredLogsByMonthYear = filterLogsByMonthYear(attendanceLogs, Number(month), Number(year));
    return this.calculateTotalSalary(filteredLogsByMonthYear);
  }

  private calculateTotalSalary(logs: any[]) {
    const logsWithCost = logs.map(log => {
      const baseCost = OwnerShiftCostMap[log.workType] ?? 0;
      const cost = log.isHoliday ? baseCost * 2 : baseCost;
      return { ...log, cost };
    });
  
    const total = logsWithCost.reduce((sum, log) => sum + log.cost, 0);
    return total;
  }
}
