import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from '../user/services/profile';
import { FriendService } from '../communication/service/friend';
import { ProfileId } from '../auth/decorators/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(
    private profileService: ProfileService,
    private friendService: FriendService,
  ) {}

  @ApiBearerAuth()
  @Get('/profile/:id')
  async getProfile(@ProfileId() profileId: string, @Param('id') id: string) {
    const profile = await this.profileService.getProfileById(id);
    const relationship = await this.friendService.findRelationship(
      profileId,
      id,
    );
    return { profile: profile, relationship: relationship };
  }
}
