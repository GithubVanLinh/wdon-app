import { Controller, Get, Param } from '@nestjs/common';
import { ProfileId } from 'src/module/auth/decorators/user';
import { getFullMediaUrl } from 'src/utils/url';
import { ProfileService } from '../services/profile';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  @Get('/:id')
  async getProfileByProfileId(
    @ProfileId() yourProfileId: string,
    @Param('id') profileId: string,
  ) {
    const profile = await this.profileService.getProfileById(profileId);
    return profile;
  }
}
