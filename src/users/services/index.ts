import { UsersService } from "./users.service";
import { GetUserByIdService } from "./get-user-by-id.service";
import { OwnersService } from "./owners.service";
import { CreateUserService } from "./create-user.service";
import { EmployeesService } from "./employees.service";

export const UsersServices = [
    UsersService,
    GetUserByIdService,
    CreateUserService,
    OwnersService,
    EmployeesService,
];
