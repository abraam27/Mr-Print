import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from '../movements.schema';
import { CreateMovementDto } from '../dtos/create-movement.dto';
import { UpdateMovementDto } from '../dtos/update-movement.dto';
import { GetMovementsService } from './get-movements.service';
import { GetMovementDto } from '../dtos/get-movements.dto';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name)
    private readonly MovementModel: Model<Movement>,
    private readonly getMovementsService: GetMovementsService,
  ) {}

  async getMovements(query: GetMovementDto) {
    return await this.getMovementsService.getMovements(query);
  }

  getMovementById(id: string) {
    return this.MovementModel.findById(id);
  }

  async createMovement(movement: CreateMovementDto) {
    return await this.MovementModel.create({
      ...movement,
      date: new Date(movement.date),
    });
  }

  async updateMovement(id: string, movement: UpdateMovementDto) {
    return await this.MovementModel.findByIdAndUpdate(id, movement, {
      new: true,
    });
  }

  async deleteMovement(id: string) {
    return await this.MovementModel.findByIdAndDelete(id);
  }
}
