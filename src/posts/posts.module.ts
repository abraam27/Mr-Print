import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.schema';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
// import { MetaOption } from 'src/meta-options/meta-options.schema';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider],
  imports: [
    UsersModule,
    MetaOptionsModule,
    TagsModule,
    PaginationModule,
    // TypeOrmModule.forFeature([Post, MetaOption]),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
    ]),
  ],
})
export class PostsModule {}
