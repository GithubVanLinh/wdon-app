import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileId } from '../auth/decorators/user';
import { FriendService } from './service';
import { FriendTypeEnum } from './models/friends';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('friends')
@ApiTags('Friends')
export class FriendController {
  constructor(private friendService: FriendService) {}
  @ApiBearerAuth()
  @Post('/send_request')
  async sendFriendRequest(
    @ProfileId() profileId: string,
    @Body('friend_id') targetId: string,
  ) {
    const request = await this.friendService.sendRequest(profileId, targetId);
    return request;
  }

  @ApiBearerAuth()
  @Post('/accept_friend')
  async acceptFriendRequest(
    @ProfileId() profileId: string,
    @Body('request_id') friendRequestId: string,
  ) {
    if (profileId === friendRequestId) {
      throw new HttpException('unable send friend request to yourself', 400);
    }
    const request = await this.friendService.getRequest(friendRequestId);
    if (String(request.friend.id) != profileId) {
      throw new UnauthorizedException();
    }

    const friend = await this.friendService.updateFriend(
      friendRequestId,
      FriendTypeEnum.FRIEND,
    );

    return friend;
  }

  @ApiBearerAuth()
  @Get('/')
  async getList(
    @ProfileId() profileId,
    @Query('type') friendType: FriendTypeEnum = FriendTypeEnum.FRIEND,
  ) {
    const friends = await this.friendService.getListFriends(
      profileId,
      friendType,
    );
    return friends;
  }
}
