import { UsersService } from './users.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { CreateUserService } from './create-user.service';
import { GetUsersService } from './get-users.service ';

export const UsersServices = [
  UsersService,
  GetUserByIdService,
  CreateUserService,
  GetUsersService,
];
