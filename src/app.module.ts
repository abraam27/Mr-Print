import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { MovementsModule } from './movements/movements.module';
import { AttendanceLogsModule } from './attendance-logs/attendance-logs.module';
import { TotalsModule } from './totals/totals.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
      dbName: 'Mr-Print',
    }),
    UsersModule,
    AttendanceLogsModule,
    TransactionsModule,
    MovementsModule,
    TotalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
