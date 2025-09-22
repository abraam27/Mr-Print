import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from '../posts/post.schema';

@Schema({ timestamps: true })
export class MetaOption extends Document {
  @Prop({
    type: MongooseSchema.Types.Mixed,
    required: true,
  })
  metaValue: any;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  post: Post;
}

export const MetaOptionSchema = SchemaFactory.createForClass(MetaOption);

// Add index for better query performance
MetaOptionSchema.index({ post: 1 }, { unique: true });
