import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetAttendanceLogsService } from 'src/attendance-logs/services/get-attendance-logs.service';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getAttendanceLogsService: GetAttendanceLogsService,
  ) {}

  calculateOwnersProfit() {
    return 'calculateOwnersProfit';
  }

  calculateOwnerExpenses() {
    return 'calculateOwnerExpenses';
  }
}
