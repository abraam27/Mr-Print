import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetaOption } from '../meta-options.schema';
import { CreateMetaOptionsDto } from '../dtos/create-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectModel(MetaOption.name)
    private readonly metaOptionModel: Model<MetaOption>,
  ) {}

  public async createMetaOption(createMetaOptionsDto: CreateMetaOptionsDto) {
    const newMetaOption = new this.metaOptionModel(createMetaOptionsDto);
    return await newMetaOption.save();
  }

  public async findByPostId(postId: string) {
    return await this.metaOptionModel.findOne({ post: postId }).exec();
  }

  public async updateByPostId(postId: string, updateData: any) {
    return await this.metaOptionModel
      .findOneAndUpdate(
        { post: postId },
        { $set: updateData },
        { new: true, upsert: true },
      )
      .exec();
  }

  public async deleteByPostId(postId: string) {
    return await this.metaOptionModel.deleteOne({ post: postId }).exec();
  }
}
