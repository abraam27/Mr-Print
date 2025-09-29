import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from '../users.enums';
import { GetOwnerTotalsService } from 'src/totals/services/get-owner-totals.service';
import { GetCustomerTotalsService } from 'src/totals/services/get-customer-totals.service';
import { GetEmployeeTotalsService } from 'src/totals/services/get-employee-totals.service.';

@Injectable()
export class GetUserByIdService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getOwnerTotalsService: GetOwnerTotalsService,
    private readonly getEmployeeTotalsService: GetEmployeeTotalsService,
    private readonly getCustomerTotalsService: GetCustomerTotalsService,
  ) {}

  async getUserById(id: string, month: number = 0, year: number = 0) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.role == UserRole.Owner) {
      return {
        ...user,
        totals: await this.getOwnerTotalsService.getOwnerTotals(
          id,
          month,
          year,
        ),
      };
    }
    if (user.role == UserRole.Employee) {
      return {
        ...user,
        totals: await this.getEmployeeTotalsService.getEmployeeTotals(
          id,
          month,
          year,
        ),
      };
    }
    if (user.role == UserRole.Customer) {
      return {
        ...user,
        totals: await this.getCustomerTotalsService.getCustomerTotals(
          id,
          month,
          year,
        ),
      };
    }
    return user;
  }
}
