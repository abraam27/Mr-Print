import { GetTransactionsService } from "./get-transactions.service";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionService } from "./create-transaction.service";

export const TransactionsServices = [TransactionsService, GetTransactionsService,
    CreateTransactionService,
];