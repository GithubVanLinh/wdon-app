import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public';
import { CreateUserDto } from './dto/create';
import { UserService } from './service';
import { AuthType } from '../auth/model/auth.schema';
import { ProfileId } from '../auth/decorators/user';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { deleteFileFromLocal, saveFileToLocal } from 'src/utils';
import { getFullMediaUrl } from 'src/utils/url';

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
    const avatarPath = saveFileToLocal('/uploads', avatar);
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
      deleteFileFromLocal('/uploads/' + avatarPath);
      throw error;
    }
  }

  @Get('/')
  async getProfile(@ProfileId() profileId: string) {
    const profile = await this.userService.getProfileById(profileId);
    profile.avatar = getFullMediaUrl(profile.avatar);
    return profile;
  }

  @Get('/:id')
  async getProfileByProfileId(
    @ProfileId() yourProfileId: string,
    @Param('id') profileId: string,
  ) {
    const profile = await this.userService.getProfileById(profileId);
    return profile;
  }

  @Public()
  @Post('/test')
  async testPost() {}
}
