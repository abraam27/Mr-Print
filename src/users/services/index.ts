import { UsersService } from './users.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { OwnersService } from './owners.service';
import { CreateUserService } from './create-user.service';
import { EmployeesService } from './employees.service';
import { GetCustomerTotalsService } from './get-customer-totals.service';
import { GetOwnerTotalsService } from './get-owner-totals.service';

export const UsersServices = [
  UsersService,
  GetUserByIdService,
  CreateUserService,
  OwnersService,
  EmployeesService,
  GetCustomerTotalsService,
  GetOwnerTotalsService,
];
