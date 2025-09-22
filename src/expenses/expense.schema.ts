import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from '../posts/post.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ 
    type: String, 
    required: true,
    minlength: 1,
    maxlength: 10 
  })
  firstName: string;

  @Prop({ 
    type: String, 
    required: false,
    maxlength: 10 
  })
  lastName?: string;

  @Prop({ 
    type: String, 
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  })
  email: string;

  @Prop({ 
    type: String, 
    required: false,
    select: false
  })
  password?: string;

  @Prop({ 
    type: String, 
    required: false,
    select: false
  })
  googleId?: string;

  @Prop([{ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Post' 
  }])
  posts?: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
