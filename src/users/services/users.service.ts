import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { filterLogsByMonthYear } from 'src/common/helpers/date-format.helpers';
import { GetUserByIdService } from './get-user-by-id.service';
import { GetAttendanceLogsService } from 'src/attendance-logs/services/get-attendance-logs.service';
import { UserRole } from '../users.enums';
import { OwnerShiftCostMap, EmployeeShiftCostMap } from 'src/attendance-logs/attendance-logs.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
    private readonly getUserByIdService: GetUserByIdService,
  ) { }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async createUser(user: CreateUserDto) {
    return await this.userModel.create(user);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async calculateSalary(userId: string, month: string, year: string) {
    const employee = await this.getUserByIdService.getUserById(userId);
    const attendanceLogs = await this.getAttendanceLogsService.getAttendanceLogs({
      userId: userId,
    });
    const filteredLogsByMonthYear = filterLogsByMonthYear(attendanceLogs, Number(month), Number(year));
    return this.calculateTotalSalary(filteredLogsByMonthYear, employee?.role);
  }

  private calculateTotalSalary(logs: any[], role: UserRole | undefined) {
    const logsWithCost = logs.map(log => {
      const baseCost = role == UserRole.Owner ? OwnerShiftCostMap[log.workType] : EmployeeShiftCostMap[log.workType] ?? 0;
      const cost = log.isHoliday ? baseCost * 2 : baseCost;
      return { ...log, cost };
    });

    const total = logsWithCost.reduce((sum, log) => sum + log.cost, 0);
    return total;
  }

  calculateOwnersProfit() {
    return "calculateOwnersProfit";
  }

  calculateOwnerShifts() {
    return "calculateOwnerShifts";
  }

  calculateOwnerExpenses() {
    return "calculateOwnerExpenses";
  }

  calculateEmployeeCommission() {
    return "calculateEmployeeCommission";
  }

  calculateEmployeeOvertime() {
    return "calculateEmployeeOvertime";
  }
}
