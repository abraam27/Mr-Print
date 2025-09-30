import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetUserByIdService } from './get-user-by-id.service';
import { FindUsersDto } from '../dtos/get-users.dto';
import { RootFilterQuery } from 'mongoose';

@Injectable()
export class GetUsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async getUsers(query: FindUsersDto) {
    const filter: RootFilterQuery<User> = {};

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

    if (query.month && query.year) {
      const start = new Date(query.year, query.month - 1, 1);
      const end = new Date(query.year, query.month, 0, 23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    const users = await this.userModel.find(filter).exec();
    if (!users) {
      throw new Error('Users not found');
    }
    const usersWithTotals = users.map((user) => {
      return this.getUserByIdService.getUserById(
        user._id.toString(),
        query.month,
        query.year,
      );
    });
    return usersWithTotals;
  }
}
