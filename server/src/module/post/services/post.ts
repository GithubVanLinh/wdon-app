import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../model/post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import { TagService } from './tag';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private tagService: TagService,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const session = await this.postModel.startSession();
    session.startTransaction();
    try {
      const tags = await this.tagService.createTags(
        session,
        createPostDto.tags,
      );

      // console.log('data', createPostDto, tags);

      const newPost = await new this.postModel({
        content: createPostDto.content,
        media: createPostDto.media,
        profile: createPostDto.profile,
        tags: tags,
      }).save({ session });
      await session.commitTransaction();
      await session.endSession();
      return newPost;
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      await session.endSession();
      throw e;
    }
  }
  getPost() {}
  getPosts() {}
}
