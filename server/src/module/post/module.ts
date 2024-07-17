import { Module } from '@nestjs/common';
import { PostController } from './controllers/post';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './model/tag.schema';
import { Post, PostSchema } from './model/post.schema';
import { PostService } from './services/post';
import { TagService } from './services/tag';
import { CommunicationModule } from '../communication/module';
import { PostGateway } from './gateway';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    ElasticsearchModule.register({
      node: 'https://localhost:9200',
      auth: {
        apiKey: 'WHBTTXY1QUJNQWdNblVLQ0E4cVU6bkpWQ3RaOG1SWDZ5dHBHaUtUeHpUUQ==',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),
    CommunicationModule,
  ],
  controllers: [PostController],
  providers: [PostService, TagService, PostGateway],
  exports: [],
})
export class PostModule {}
