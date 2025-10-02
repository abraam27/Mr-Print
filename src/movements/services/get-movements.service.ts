import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from '../movements.schema';
import { GetMovementDto } from '../dtos/get-movements.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class GetMovementsService {
  constructor(
    @InjectModel(Movement.name)
    private readonly MovementModel: Model<Movement>,
  ) {}

  async getMovements(query: GetMovementDto) {
    const { filter, options } = this.buildFilterFromQuery(query);
    return this.MovementModel.find(filter, null, options).exec();
  }

  private buildFilterFromQuery(query: GetMovementDto): {
    filter: FilterQuery<Movement>;
    options: { skip?: number; limit?: number; sort?: any };
  } {
    const filter: FilterQuery<Movement> = {};
    const options: any = {};

    if (query.fromDate || query.toDate) {
      filter.date = {};
      if (query.fromDate) {
        filter.date.$gte = new Date(query.fromDate);
      }
      if (query.toDate) {
        filter.date.$lte = new Date(query.toDate);
      }
    }

    if (query.month && query.year) {
      const start = new Date(query.year, query.month - 1, 1);
      const end = new Date(query.year, query.month, 0, 23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.ownerId) {
      filter.ownerId = query.ownerId;
    }

    if (query.userId) {
      filter.userId = query.userId;
    }

    if (query.isShop !== undefined) {
      filter.isShop = query.isShop;
    }

    if (query.isCustomer !== undefined) {
      filter.isCustomer = query.isCustomer;
    }

    if (query.category) {
      filter.category = query.category;
    }
    if (query.subCategory) {
      filter.subCategory = query.subCategory;
    }

    if (query.minAmount !== undefined || query.maxAmount !== undefined) {
      filter.amount = {};
      if (query.minAmount !== undefined) {
        filter.amount.$gte = query.minAmount;
      }
      if (query.maxAmount !== undefined) {
        filter.amount.$lte = query.maxAmount;
      }
    }

    // ✅ Only apply pagination if needed
    if (query.pagination) {
      const page = query.page ?? 1;
      const limit = query.limit ?? 20;
      options.skip = (page - 1) * limit;
      options.limit = limit;
    }

    if (query.sortBy) {
      options.sort = {
        [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1,
      };
    } else {
      options.sort = { date: -1 };
    }

    return { filter, options };
  }
}
