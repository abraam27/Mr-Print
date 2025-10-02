import { Module, forwardRef } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movements.schema';
import { MovementsServices } from './services/index';
import { UsersModule } from 'src/users/users.module';

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
    forwardRef(() => UsersModule),
  ],
})
export class MovementsModule {}
