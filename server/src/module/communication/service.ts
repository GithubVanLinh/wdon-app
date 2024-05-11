import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friend, FriendTypeEnum } from './models/friends';
import { Model } from 'mongoose';

@Injectable()
export class FriendService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<Friend>) {}

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
    const newFriendRequest = await new this.friendModel({
      profile_id: profileId,
      friend_id: targetProfileId,
      friendType: FriendTypeEnum.PENDING,
    }).save();

    console.log('new', newFriendRequest);
    return newFriendRequest;
  }

  async updateFriend(friendId: string, friendType: FriendTypeEnum) {
    const session = await this.friendModel.startSession();
    session.startTransaction();
    try {
      const friend = await this.friendModel.findById(friendId);
      friend.friendType = friendType;
      await friend.save({ session });
      const newFriend = await new this.friendModel({
        profile_id: friend.friend_id,
        friend_id: friend.profile_id,
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
}
