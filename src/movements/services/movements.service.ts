import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from '../movements.schema';
import { CreateMovementDto } from '../dtos/create-movement.dto';
import { UpdateMovementDto } from '../dtos/update-movement.dto';
import { GetMovementsService } from './get-movements.service';
import { GetMovementDto } from '../dtos/get-movements.dto';
import { CreateMovementService } from './create-movement.service.';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name)
    private readonly movementModel: Model<Movement>,
    private readonly getMovementsService: GetMovementsService,
    private readonly createMovementService: CreateMovementService,
  ) {}

  async getMovements(query: GetMovementDto) {
    return await this.getMovementsService.getMovements(query);
  }

  getMovementById(id: string) {
    return this.movementModel.findById(id);
  }

  async createMovement(movement: CreateMovementDto) {
    return await this.createMovementService.createMovement(movement);
  }

  async updateMovement(id: string, movement: UpdateMovementDto) {
    return await this.movementModel.findByIdAndUpdate(id, movement, {
      new: true,
    });
  }

  async deleteMovement(id: string) {
    return await this.movementModel.findByIdAndDelete(id);
  }
}
