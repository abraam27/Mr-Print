import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "../transactions.schema";
import { GetTransactionDto } from "../dtos/get-transactions.dto";

export class GetTransactionsService {
    constructor(@InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>) { }

    async getTransactions(query: GetTransactionDto) {
        return await this.transactionModel.find(query);
    }
}