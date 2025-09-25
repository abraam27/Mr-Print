import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './attendance-logs/attendance-logs.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/', { dbName: 'Mr-Print' }),
    UsersModule,
    AttendanceModule,
    TransactionsModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
