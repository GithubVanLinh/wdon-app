import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { saveFileToLocal } from 'wd-type-utilities';
import { CreatePostDto } from '../dto/create-post.dto';
import { ProfileId } from 'src/module/auth/decorators/user';
import { PostService } from '../services/post';
import { MediaEnum } from '../model/post.schema';

const MIMETYPE = ['image/png', 'image/jpeg', 'video/mp4'];

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

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
      const name = saveFileToLocal('./uploads/', file);
      listName.push(name);
    }

    const post = await this.postService.createPost({
      content: createPostDto.content,
      media: listName.map((name) => ({ type: MediaEnum.IMAGE, url: name })),
      profile: profileId,
      tags: ['unknow'],
    });
    return post;
  }
}
