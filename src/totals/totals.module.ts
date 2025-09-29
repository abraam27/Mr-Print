import { Module } from '@nestjs/common';
import { TotalsServices } from './services/index';
import { TotalsController } from './totals.controller';
import { MovementsModule } from '../movements/movements.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { AttendanceLogsModule } from '../attendance-logs/attendance-logs.module';
import { forwardRef } from '@nestjs/common';
@Module({
  controllers: [TotalsController],
  providers: [...TotalsServices],
  exports: [...TotalsServices],
  imports: [
    MovementsModule,
    TransactionsModule,
    AttendanceLogsModule,
    forwardRef(() => UsersModule),
  ],
})
export class TotalsModule {}
