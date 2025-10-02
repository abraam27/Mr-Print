import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from '../movements.schema';
import { CreateMovementDto } from '../dtos/create-movement.dto';
import { GetUserByIdService } from 'src/users/services/get-user-by-id.service';
import { getWeekday } from 'src/common/helpers/getWeekday.helper';

@Injectable()
export class CreateMovementService {
  constructor(
    @InjectModel(Movement.name)
    private readonly movementModel: Model<Movement>,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async createMovement(
    createMovementDto: CreateMovementDto,
  ): Promise<Movement> {
    const { ownerId, userId, date } = createMovementDto;

    const dayOfWeek = getWeekday(new Date(date).toISOString());

    const owner = ownerId
      ? await this.getUserByIdService.getUserById(ownerId)
      : null;
    const user = userId
      ? await this.getUserByIdService.getUserById(userId)
      : null;

    const movement = {
      ...createMovementDto,
      dayOfWeek,
      ...(owner && { ownerName: `${owner.firstName} ${owner.lastName}` }),
      ...(user && { userName: `${user.firstName} ${user.lastName}` }),
    };

    return this.movementModel.create(movement);
  }
}
