import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movements.schema';
import { MovementsServices } from './services/index';

@Module({
  controllers: [MovementsController],
  providers: [...MovementsServices],
  exports: [...MovementsServices],
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
