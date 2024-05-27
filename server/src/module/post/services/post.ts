import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../model/post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import { TagService } from './tag';
import { getFullMediaUrl } from 'src/utils/url';

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
    post.media.map((p) => (p.url = getFullMediaUrl(p.url)));
    return post;
  }

  //TODO
  async getPosts() {
    const posts = await this.postModel.find({}).populate('profile');
    return posts;
  }
}
