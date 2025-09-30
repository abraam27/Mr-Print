import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { GetUserByIdService } from './get-user-by-id.service';
import { GetUsersDto } from '../dtos/get-users.dto';
import { GetUsersService } from './get-users.service ';
import { CreateUserService } from './create-user.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUsersService: GetUsersService,
    private readonly createUserService: CreateUserService,
  ) {}

  async getUsers(query: GetUsersDto) {
    return await this.getUsersService.getUsers(query);
  }

  getUserById(id: string) {
    return this.getUserByIdService.getUserById(id);
  }

  async createUser(user: CreateUserDto) {
    return await this.createUserService.createUser(user);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
