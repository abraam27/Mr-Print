import { Module } from '@nestjs/common';
import { UsersServices } from './services/index';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { AttendanceLogsModule } from '../attendance-logs/attendance-logs.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { MovementsModule } from '../movements/movements.module';
import { forwardRef } from '@nestjs/common';
import { TotalsModule } from '../totals/totals.module';
import { UsersController } from './users.controller';
@Module({
  controllers: [UsersController],
  providers: [...UsersServices],
  exports: [...UsersServices],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AttendanceLogsModule),
    forwardRef(() => TransactionsModule),
    forwardRef(() => MovementsModule),
    forwardRef(() => TotalsModule),
  ],
})
export class UsersModule {}
