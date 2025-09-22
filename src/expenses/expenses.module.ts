import { AuthModule } from '../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './expenses.controller';
import { UsersService } from './services/users.service';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { UsersCreateManyService } from './services/users-create-many.service.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateUserProvider } from './services/create-user.provider';
import { FindOneUserByEmailProvider } from './services/find-one-user-by-email';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { FindOneByGoogleIdProvider } from './services/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './services/create-google-user.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './expense.schema';
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyService,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService, FindOneUserByEmailProvider],
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(profileConfig),
    PaginationModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class ExpensesModule {}
