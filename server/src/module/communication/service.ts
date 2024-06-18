import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friend, FriendTypeEnum } from './models/friends';
import { Model } from 'mongoose';
import { UserService } from '../user/service';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<Friend>,
    private userService: UserService,
  ) {}

  async getRequest(id: string) {
    return await this.friendModel.findById(id);
  }

  async sendRequest(profileId: string, targetProfileId: string) {
    const oldFriendReq = await this.friendModel.findOne({
      profile_id: profileId,
      friend_id: targetProfileId,
    });

    if (oldFriendReq) {
      return oldFriendReq;
    }

    console.log('datacreate', {
      profile_id: profileId,
      friend_id: targetProfileId,
      friendType: FriendTypeEnum.PENDING,
    });

    const yourProfile = await this.userService.getProfileById(profileId);
    try {
      const targetProfile =
        await this.userService.getProfileById(targetProfileId);

      const newFriendRequest = await new this.friendModel({
        profile: yourProfile,
        friend: targetProfile,
        friendType: FriendTypeEnum.PENDING,
      }).save();

      console.log('new', newFriendRequest);
      return newFriendRequest;
    } catch (error) {
      throw new BadRequestException('target id not found');
    }
  }

  async updateFriend(friendId: string, friendType: FriendTypeEnum) {
    const session = await this.friendModel.startSession();
    session.startTransaction();
    try {
      const friend = await this.friendModel.findById(friendId);
      friend.friendType = friendType;
      await friend.save({ session });
      const friendProfile = await this.userService.getProfileById(
        friend.friend.id,
        {
          session,
        },
      );
      const yourProfile = await this.userService.getProfileById(
        friend.profile.id,
        { session: session },
      );
      const newFriend = await new this.friendModel({
        profile: friendProfile,
        friend_id: yourProfile,
        friendType: FriendTypeEnum.FRIEND,
      }).save({ session });
      await session.commitTransaction();
      await session.endSession();
      return [friend, newFriend];
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }

  async isFriend(profileId: string, targetId: string) {
    const friend = await this.friendModel.findOne({
      profile_id: profileId,
      friend_id: targetId,
      friendType: FriendTypeEnum.FRIEND,
    });

    return !!friend;
  }

  async getListFriends(
    profileId: string,
    friendType: FriendTypeEnum = FriendTypeEnum.FRIEND,
  ) {
    console.log(profileId, friendType);
    const friends = await this.friendModel
      .find({
        profile: profileId,
        friendType: friendType,
      })
      .populate('friend');

    return friends;
  }
}
