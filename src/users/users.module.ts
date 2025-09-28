import { Module } from '@nestjs/common';
import { UsersServices } from './services/index';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { AttendanceLogsModule } from '../attendance-logs/attendance-logs.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { forwardRef } from '@nestjs/common';
import { usersController } from './controllers';
@Module({
  controllers: [...usersController],
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
    TransactionsModule,
  ],
})
export class UsersModule { }
