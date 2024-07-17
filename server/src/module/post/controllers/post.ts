import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreatePostDto } from '../dto/create-post.dto';
import { ProfileId } from 'src/module/auth/decorators/user';
import { PostService } from '../services/post';
import { MediaEnum } from '../model/post.schema';
import { extractTagFromString } from 'src/utils/string';
import { FriendService } from 'src/module/communication/service/friend';
import { getFullMediaUrl } from 'src/utils/url';
import { deleteFileFromLocal, saveFileToLocal } from 'src/utils';
import { PostGateway } from '../gateway';
import { ApiTags } from '@nestjs/swagger';
import { GetPostsDto } from '../dto/get-post.dt';
import { Public } from 'src/module/auth/decorators/public';

const MIMETYPE = ['image/png', 'image/jpeg', 'image/webp', 'video/mp4'];

@Controller('posts')
@ApiTags('Post')
export class PostController {
  constructor(
    private postService: PostService,
    private friendService: FriendService,
    private postGateway: PostGateway,
  ) {}

  @Public()
  @Post('/test')
  async test() {
    // return await this.postService.createSampleInElastic();
    return await this.postService.getElasticData();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      fileFilter(req, file, callback) {
        callback(null, MIMETYPE.includes(file.mimetype));
      },
    }),
  )
  async createPost(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createPostDto: CreatePostDto,
    @ProfileId() profileId: string,
  ) {
    const listName = [];
    for (const file of files) {
      const type = file.mimetype;
      const name = saveFileToLocal('./uploads/', file);
      listName.push({ name: name, type: type.split('/')[0] });
    }
    const tags = extractTagFromString(createPostDto.content || '');
    try {
      const post = await this.postService.createPost({
        content: createPostDto.content,
        media: listName.map(({ name, type }) => ({
          type: type as MediaEnum,
          url: name,
        })),
        profile: profileId,
        auth: createPostDto.auth,
        tags: tags,
      });
      return post;
    } catch (error) {
      for (const name of listName) {
        deleteFileFromLocal('./uploads/' + name);
      }
      throw error;
    }
  }

  @Get('/:postId')
  async getPost(
    @ProfileId() profileId: string,
    @Param('postId') postId: string,
  ) {
    const post = await this.postService.getPost(postId);
    post.media.map((m) => (m.url = getFullMediaUrl(m.url)));
    return post;

    // if (post.profile.id === profileId) {
    //   return post;
    // }

    // switch (post.auth) {
    //   case PostAuthEnum.ANYONE:
    //     break;
    //   case PostAuthEnum.FRIENDS: {
    //     const isFriend = await this.friendService.isFriend(
    //       profileId,
    //       post.profile.id,
    //     );
    //     if (isFriend) {
    //       return { ...post.toObject(), from_friend: true };
    //     }
    //     throw new UnauthorizedException();
    //   }
    //   case PostAuthEnum.ONLY_ME:
    //   default:
    //     throw new UnauthorizedException();
    // }

    // return post;
  }

  @Get('/')
  async getPosts(@Query() { profileId }: GetPostsDto) {
    const posts = await this.postService.getPosts({ profileId: profileId });
    posts.map((p) => p.media.map((m) => (m.url = getFullMediaUrl(m.url))));
    return posts;
  }
}
