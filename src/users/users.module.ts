import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { AttendanceLogsModule } from '../attendance-logs/attendance-logs.module';
import { TransactionsModule } from '../transactions/transactions.module';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AttendanceLogsModule,
    TransactionsModule,
  ],
})
export class UsersModule {}
