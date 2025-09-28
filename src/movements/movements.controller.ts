import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { MovementsService } from './services/movements.service';
import { CreateMovementDto } from './dtos/create-movement.dto';
import { UpdateMovementDto } from './dtos/update-movement.dto';
import { GetMovementDto } from './dtos/get-movements.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get('')
  public getMovements(@Query() query: GetMovementDto) {
    return this.movementsService.getMovements(query);
  }

  @Get('/:id')
  public getMovement(@Param('id') id: string) {
    return this.movementsService.getMovementById(id);
  }

  @Post()
  public createMovement(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.createMovement(createMovementDto);
  }

  @Put('/:id')
  public updateMovement(
    @Param('id') id: string,
    @Body() updateMovementDto: UpdateMovementDto,
  ) {
    return this.movementsService.updateMovement(id, updateMovementDto);
  }

  @Delete('/:id')
  public deleteMovement(@Param('id') id: string) {
    return this.movementsService.deleteMovement(id);
  }
}
