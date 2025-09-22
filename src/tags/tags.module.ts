import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './providers/tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './tag.schema';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag]), MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
})
export class TagsModule { }
