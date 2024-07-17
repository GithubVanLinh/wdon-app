import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileId } from 'src/module/auth/decorators/user';
import { getFullMediaUrl } from 'src/utils/url';
import { ProfileService } from '../services/profile';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { deleteFilesFromLocal, saveFileToLocal } from 'src/utils';
import { UpdateProfileDto } from '../dto/update';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiBearerAuth()
  @Get('/')
  async getProfile(@ProfileId() profileId: string) {
    const profile = await this.profileService.getProfileById(profileId);
    profile.avatar = getFullMediaUrl(profile.avatar);
    return profile;
  }

  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @Post('/')
  async updateProfile(
    @ProfileId() profileId: string,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    const profile = await this.profileService.getProfileById(profileId);

    let avatar: string, background: string;
    try {
      console.log('old', profile);
      if (files) {
        if (files.avatar) {
          avatar = saveFileToLocal('uploads', files.avatar[0]);
        }
        if (files.background) {
          background = saveFileToLocal('uploads', files.background[0]);
        }
      }

      const updateData: UpdateProfileDto = {
        avatar: avatar,
        background: background,
      };

      await this.profileService.updateProfileById(profileId, updateData);

      const data = await this.profileService.getProfileById(profileId);

      return data;
    } catch (e) {
      if (avatar) {
        deleteFilesFromLocal('uploads', [avatar]);
      }
      if (background) {
        deleteFilesFromLocal('uploads', [background]);
      }
    }
  }

  @ApiBearerAuth()
  @Get('/:id')
  async getProfileByProfileId(
    @ProfileId() yourProfileId: string,
    @Param('id') profileId: string,
  ) {
    console.log(
      'server/src/module/user/controllers/profile.ts',
      'Profileid',
      profileId,
    );
    const profile = await this.profileService.getProfileById(profileId);
    return profile;
  }
}
