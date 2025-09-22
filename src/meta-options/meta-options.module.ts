import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './providers/meta-options.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetaOption, MetaOptionSchema } from './meta-options.schema';

@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  exports: [MetaOptionsService],
  imports: [
    MongooseModule.forFeature([
      { name: MetaOption.name, schema: MetaOptionSchema },
    ]),
  ],
})
export class MetaOptionsModule {}
