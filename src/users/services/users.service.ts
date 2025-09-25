import { Injectable } from '@nestjs/common';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
