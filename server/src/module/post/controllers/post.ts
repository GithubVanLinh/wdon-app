import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { deleteFileFromLocal, saveFileToLocal } from 'wd-type-utilities';
import { CreatePostDto } from '../dto/create-post.dto';
import { ProfileId } from 'src/module/auth/decorators/user';
import { PostService } from '../services/post';
import { MediaEnum } from '../model/post.schema';
import { extractTagFromString } from 'src/utils/string';

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
    const tags = extractTagFromString(createPostDto.content || '');
    try {
      const post = await this.postService.createPost({
        content: createPostDto.content,
        media: listName.map((name) => ({ type: MediaEnum.IMAGE, url: name })),
        profile: profileId,
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
  async getPost(@Param('postId') postId: string) {
    return await this.postService.getPost(postId);
  }
}
