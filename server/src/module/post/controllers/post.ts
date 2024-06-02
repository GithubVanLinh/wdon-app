import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { deleteFileFromLocal, saveFileToLocal } from 'wd-type-utilities';
import { CreatePostDto } from '../dto/create-post.dto';
import { ProfileId } from 'src/module/auth/decorators/user';
import { PostService } from '../services/post';
import { MediaEnum, PostAuthEnum } from '../model/post.schema';
import { extractTagFromString } from 'src/utils/string';
import { FriendService } from 'src/module/communication/service';
import { Public } from 'src/module/auth/decorators/public';
import { getFullMediaUrl } from 'src/utils/url';

const MIMETYPE = ['image/png', 'image/jpeg', 'video/mp4'];

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private friendService: FriendService,
  ) {}

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

  //TODO
  @Get('/')
  async getPosts() {
    const posts = await this.postService.getPosts();
    posts.map((p) => p.media.map((m) => (m.url = getFullMediaUrl(m.url))));
    return posts;
  }
}
