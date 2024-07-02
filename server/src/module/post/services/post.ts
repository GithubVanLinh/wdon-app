import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Post } from '../model/post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import { TagService } from './tag';
import { GetPostsDto } from '../dto/get-post.dt';

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
      const tags =
        createPostDto.tags &&
        (await this.tagService.createTags(session, createPostDto.tags));

      const newPost = await new this.postModel({
        content: createPostDto.content,
        media: createPostDto.media,
        profile: createPostDto.profile,
        auth: createPostDto.auth,
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

  async getPost(postId: string) {
    const post = await this.postModel.findById(postId).populate('profile');
    return post;
  }

  //TODO
  async getPosts({ profileId }: GetPostsDto = {}) {
    const condition: FilterQuery<Post> = {};
    if (profileId) {
      condition.profile = profileId;
    }
    const posts = await this.postModel
      .find(condition)
      .sort({ createdAt: -1 })
      .populate('profile');
    return posts;
  }
}
