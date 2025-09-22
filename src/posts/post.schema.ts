import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enum';
import { User } from 'src/users/user.schema';
import { Tag } from 'src/tags/tag.schema';

@Schema()
export class Post extends Document {
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
        enum: PostType,
        default: PostType.POST,
    })
    postType: PostType;

    @Prop({
        type: String,
        required: true,
    })
    slug: string;

    @Prop({
        type: String,
        required: true,
        enum: PostStatus,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;

    @Prop({
        type: String,
        required: false,
    })
    content?: string;

    @Prop({
        type: String,
        required: false,
    })
    featuredImageUrl?: string;

    @Prop({
        type: Date,
        required: false,
    })
    publishOn?: Date;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    author: User;

    @Prop({
        type: [{type: mongoose.Schema.Types.ObjectId, ref: Tag.name}],
        required: false,
    })
    tags?: Tag[];
}

export const PostSchema = SchemaFactory.createForClass(Post);