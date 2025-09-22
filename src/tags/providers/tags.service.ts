import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(
    // @InjectRepository(Tag)
    // private readonly tagsRepository: Repository<Tag>,

    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>,
  ) {}
  public async findAll() {
    return await this.tagModel.find();
  }

  public async createTag(createTagDto: CreateTagDto) {
    let tag = new this.tagModel(createTagDto);
    return await tag.save();
  }

  public async findOneByMultipleIds(ids: number[]) {
    return await this.tagModel.find({ where: { id: In(ids) } });
  }

  public async deleteTag(id: number) {
    await this.tagModel.deleteOne({ _id: id });
    return { deleted: true, id };
  }

  public async softDeleteTag(id: number) {
    await this.tagModel.deleteOne({ _id: id });
    return { deleted: true, id };
  }
}
