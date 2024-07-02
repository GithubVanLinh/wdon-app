import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileId } from '../../auth/decorators/user';
import { FriendService } from '../service/friend';
import { FriendTypeEnum } from '../models/friends';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

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
  @ApiBody({ schema: { properties: { friend_id: { type: 'string' } } } })
  @Post('/follow')
  async follow(
    @ProfileId() profileId: string,
    @Body('friend_id')
    targetId: string,
  ) {
    const req = await this.friendService.follow(profileId, targetId);
    return req;
  }

  @ApiBearerAuth()
  @ApiBody({ schema: { properties: { friend_id: { type: 'string' } } } })
  @Post('/unfollow')
  async unfollow(
    @ProfileId() profileId: string,
    @Body('friend_id') tar: string,
  ) {
    const res = await this.friendService.unfollow(profileId, tar);
    return res;
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
