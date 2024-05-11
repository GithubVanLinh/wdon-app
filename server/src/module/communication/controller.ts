import {
  Body,
  Controller,
  HttpException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileId } from '../auth/decorators/user';
import { FriendService } from './service';
import { FriendTypeEnum } from './models/friends';

@Controller('friends')
export class FriendController {
  constructor(private friendService: FriendService) {}
  @Post('/send_request')
  async sendFriendRequest(
    @ProfileId() profileId: string,
    @Body('friend_id') targetId: string,
  ) {
    const request = await this.friendService.sendRequest(profileId, targetId);
    return request;
  }

  @Post('/accept_friend')
  async acceptFriendRequest(
    @ProfileId() profileId: string,
    @Body('request_id') friendRequestId: string,
  ) {
    if (profileId === friendRequestId) {
      throw new HttpException('unable send friend request to yourself', 400);
    }
    const request = await this.friendService.getRequest(friendRequestId);
    if (String(request.friend_id) !== profileId) {
      throw new UnauthorizedException();
    }

    const friend = await this.friendService.updateFriend(
      friendRequestId,
      FriendTypeEnum.FRIEND,
    );

    return friend;
  }
}
