import { Module } from '@nestjs/common';
import { PostController } from './controllers/post';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './model/tag.schema';
import { Post, PostSchema } from './model/post.schema';
import { PostService } from './services/post';
import { TagService } from './services/tag';
import { CommunicationModule } from '../communication/module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    CommunicationModule,
  ],
  controllers: [PostController],
  providers: [PostService, TagService],
  exports: [],
})
export class PostModule {}
