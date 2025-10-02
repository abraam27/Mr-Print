import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Transaction } from '../transactions.schema';
import { GetTransactionDto } from '../dtos/get-transactions.dto';

export class GetTransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getTransactions(query: GetTransactionDto) {
    const { filter, options } = this.buildFilterFromQuery(query);
    return this.transactionModel.find(filter, null, options).exec();
  }

  buildFilterFromQuery(query: GetTransactionDto): {
    filter: FilterQuery<Transaction>;
    options: { skip?: number; limit?: number; sort?: any };
  } {
    const filter: FilterQuery<Transaction> = {};
    const options: any = {};

    // ✅ Date range
    if (query.fromDate || query.toDate) {
      filter.Date = {};
      if (query.fromDate) {
        filter.Date.$gte = new Date(query.fromDate);
      }
      if (query.toDate) {
        filter.Date.$lte = new Date(query.toDate);
      }
    }

    if (query.month && query.year) {
      const start = new Date(query.year, query.month - 1, 1);
      const end = new Date(query.year, query.month, 0, 23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    // ✅ Direct filters
    if (query.customerId) filter.customerId = query.customerId;
    if (query.employeeId) filter.employeeId = query.employeeId;
    if (query.paperType) filter.paperType = query.paperType;
    if (query.status) filter.status = query.status;
    if (query.isShop !== undefined) filter.isShop = query.isShop;

    // ✅ Ranges
    if (query.minPaperCost !== undefined || query.maxPaperCost !== undefined) {
      filter.paperCost = {};
      if (query.minPaperCost !== undefined)
        filter.paperCost.$gte = query.minPaperCost;
      if (query.maxPaperCost !== undefined)
        filter.paperCost.$lte = query.maxPaperCost;
    }

    if (query.minTotalCost !== undefined || query.maxTotalCost !== undefined) {
      filter.totalCost = {};
      if (query.minTotalCost !== undefined)
        filter.totalCost.$gte = query.minTotalCost;
      if (query.maxTotalCost !== undefined)
        filter.totalCost.$lte = query.maxTotalCost;
    }

    // ✅ Optional comment search (case-insensitive)
    if (query.comment) {
      filter.comment = { $regex: query.comment, $options: 'i' };
    }

    // ✅ Pagination only if requested
    if (query.pagination) {
      const page = query.page ?? 1;
      const limit = query.limit ?? 20;
      options.skip = (page - 1) * limit;
      options.limit = limit;
    }

    // ✅ Sorting
    if (query.sortBy) {
      options.sort = {
        [query.sortBy]: query.sortOrder === 'asc' ? 1 : -1,
      };
    } else {
      options.sort = { Date: -1 };
    }

    return { filter, options };
  }
}
