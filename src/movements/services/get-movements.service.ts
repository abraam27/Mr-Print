import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from '../movements.schema';
import { QueryMovementDto } from '../dtos/query-movements.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class GetMovementsService {
  constructor(
    @InjectModel(Movement.name)
    private readonly MovementModel: Model<Movement>,
  ) {}

  async getMovements(query: QueryMovementDto) {
    const { filter, options } = this.buildFilterFromQuery(query);
    return await this.MovementModel.find(filter, null, options).exec();
  }

  buildFilterFromQuery(query: QueryMovementDto): {
    filter: FilterQuery<Movement>;
    options: { skip?: number; limit?: number; sort?: any };
  } {
    const filter: FilterQuery<Movement> = {};
    const options: any = {};

    if (query.startDate || query.endDate) {
      filter.date = {};
      if (query.startDate) {
        filter.date.$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        filter.date.$lte = new Date(query.endDate);
      }
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.ownerId) {
      filter.ownerId = query.ownerId;
    }

    if (query.isShop !== undefined) {
      filter.isShop = query.isShop;
    }

    if (query.isCustomers !== undefined) {
      filter.isCustomers = query.isCustomers;
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

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    options.skip = (page - 1) * limit;
    options.limit = limit;

    if (query.sortBy) {
      options.sort = {
        [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1,
      };
    } else {
      options.sort = { date: -1 };
    }

    return { filter, options };
  }

  async findAll(query: QueryMovementDto) {
    const { filter, options } = this.buildFilterFromQuery(query);
    return this.MovementModel.find(filter, null, options).exec();
  }
}
