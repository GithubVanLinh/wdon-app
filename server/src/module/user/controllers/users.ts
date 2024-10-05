import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '../../auth/decorators/public';
import { CreateUserDto } from '../dto/create';
import { UserService } from '../services/user';
import { AuthType } from '../../auth/model/auth.schema';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { deleteFileFromLocal, saveFileToLocal } from 'src/utils';

@Controller('/users')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('/')
  @UseInterceptors(FileInterceptor('avatar'))
  async createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    console.log(body);
    let avatarPath;
    if (avatar) {
      avatarPath = saveFileToLocal('/uploads', avatar);
    }
    try {
      return await this.userService.createUser({
        ...body,
        avatar: avatarPath,
        firstName: body.firstName,
        lastName: body.lastName,
        authType: AuthType.LOCAL,
        username: body.username,
        password: body.password,
      });
    } catch (error) {
      if (avatarPath) {
        deleteFileFromLocal('/uploads/' + avatarPath);
      }
      throw error;
    }
  }

  @Public()
  @Post('/test')
  async testPost() {}
}
