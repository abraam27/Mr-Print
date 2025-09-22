import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  slug: string;

  @Prop({
    type: String,
    nullable: true,
  })
  description?: string;

  @Prop({
    type: String,
    nullable: true,
  })
  featuredImageUrl?: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
