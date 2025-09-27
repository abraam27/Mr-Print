import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movements.schema';
import { MovementsService } from './services/movements.service';

@Module({
  controllers: [MovementsController],
  providers: [MovementsService],
  exports: [MovementsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Movement.name,
        schema: MovementSchema,
      },
    ]),
  ],
})
export class MovementsModule {}
