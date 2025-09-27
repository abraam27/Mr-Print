import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../users.schema';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    return await this.userModel.create(user);
  }
}
