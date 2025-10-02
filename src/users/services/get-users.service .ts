import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetUserByIdService } from './get-user-by-id.service';
import { GetUsersDto } from '../dtos/get-users.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class GetUsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async getUsers(query: GetUsersDto) {
    const filter: FilterQuery<User> = {};

    if (query.firstName) {
      filter.firstName = { $regex: query.firstName, $options: 'i' };
    }

    if (query.lastName) {
      filter.lastName = { $regex: query.lastName, $options: 'i' };
    }

    if (query.mobile) {
      filter.mobile = query.mobile;
    }

    if (query.role) {
      filter.role = query.role;
    }

    if (query.employeeId) {
      filter.employeeId = query.employeeId;
    }

    const users = await this.userModel.find(filter).lean().exec();
    if (!users) {
      throw new Error('Users not found');
    }

    const usersWithTotals = await Promise.all(
      users.map(async (user) => {
        const userWithTotals =
          await this.getUserByIdService.getUserByIdWithTotals(
            user._id.toString(),
            query.month,
            query.year,
          );

        const employee = user.employeeId
          ? await this.getUserByIdService.getUserById(user.employeeId)
          : null;

        return {
          ...userWithTotals,
          employeeName: employee
            ? `${employee.firstName} ${employee.lastName}`
            : '',
        };
      }),
    );

    return usersWithTotals;
  }
}
