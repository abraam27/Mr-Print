import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';
import { PaperCostMap } from '../transactions.constants';
import { getWeekday } from 'src/common/helpers/getWeekday.helper';
import { forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';

export class PrepareTransactionService {
  constructor(
    @Inject(forwardRef(() => GetUserByIdService))
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async prepareTransaction(createTransactionDto: CreateTransactionDto) {
    const customer = createTransactionDto.customerId
      ? await this.getUserByIdService.getUserById(
          createTransactionDto.customerId,
        )
      : null;

    const employee = customer?.employeeId
      ? await this.getUserByIdService.getUserById(customer?.employeeId)
      : null;

    const totalCost = this.calculateTotalCost(createTransactionDto);
    const totalPapersSales = this.calculateTotalSales(createTransactionDto);
    const grossProfit = this.calculateGrossProfit(totalPapersSales, totalCost);
    const employeeCommission = this.calculateEmployeeCommission(
      grossProfit,
      (customer?.employeePercentage as number) ?? 0.1,
    );
    const netProfit = this.calculateNetProfit(grossProfit, employeeCommission);

    return this.buildTransaction(
      createTransactionDto,
      customer,
      employee,
      totalCost,
      totalPapersSales,
      grossProfit,
      employeeCommission,
      netProfit,
    );
  }

  private calculateTotalCost(transaction: CreateTransactionDto): number | null {
    return transaction.numberOfPapers
      ? transaction.numberOfPapers * PaperCostMap[transaction.paperType]
      : null;
  }

  private calculateTotalSales(
    transaction: CreateTransactionDto,
  ): number | null {
    return transaction.numberOfPapers && transaction.paperSales
      ? transaction.numberOfPapers * transaction.paperSales
      : null;
  }

  private calculateGrossProfit(
    totalSales: number | null,
    totalCost: number | null,
  ): number {
    return totalSales && totalCost ? totalSales - totalCost : 0;
  }

  private calculateEmployeeCommission(
    grossProfit: number,
    employeePercentage: number,
  ): number {
    return grossProfit && employeePercentage
      ? grossProfit * employeePercentage
      : 0;
  }

  private calculateNetProfit(
    grossProfit: number,
    employeeCommission: number,
  ): number {
    return grossProfit && employeeCommission
      ? grossProfit - employeeCommission
      : 0;
  }

  private buildTransaction(
    transaction: CreateTransactionDto,
    customer: any,
    employee: any,
    totalCost: number | null,
    totalSales: number | null,
    grossProfit: number,
    employeeCommission: number,
    netProfit: number,
  ) {
    return {
      ...transaction,
      date: transaction.date,
      dayOfWeek: getWeekday(transaction.date.toISOString()),
      employeeId: customer?.employeeId,
      employeePercentage: customer?.employeePercentage ?? 0.1,
      employeeName: employee
        ? employee.lastName
          ? `${employee.firstName} ${employee.lastName}`
          : employee.firstName
        : '',
      paperCost: PaperCostMap[transaction.paperType],
      totalCost,
      totalPapersSales: Number(totalSales?.toFixed(2)),
      expectedPaid: transaction.expectedPaid ?? totalSales,
      grossProfit,
      employeeCommission,
      netProfit,
      comment: transaction.comment,
      customerName: customer
        ? customer.lastName
          ? `${customer.firstName} ${customer.lastName}`
          : customer.firstName
        : '',
    };
  }
}
