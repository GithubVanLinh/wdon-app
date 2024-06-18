import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile, ProfileDocument } from 'src/module/user/model/profile.schema';
import { BaseSchema } from 'src/schema/base.schema';

export enum FriendTypeEnum {
  FRIEND = 'friend',
  FOLLOWING = 'following',
  PENDING = 'pending',
}

@Schema()
export class Friend extends BaseSchema {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  profile: ProfileDocument;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  friend: ProfileDocument;

  @Prop({ type: String, enum: FriendTypeEnum, required: true })
  friendType: FriendTypeEnum;
}

export type FriendDocument = HydratedDocument<Friend>;
export const FriendSchema = SchemaFactory.createForClass(Friend);
FriendSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
