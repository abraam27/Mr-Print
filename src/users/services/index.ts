import { UsersService } from './users.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { CreateUserService } from './create-user.service';

export const UsersServices = [
  UsersService,
  GetUserByIdService,
  CreateUserService,
];
