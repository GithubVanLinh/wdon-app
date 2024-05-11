import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum FriendTypeEnum {
  FRIEND = 'friend',
  FOLLOWING = 'following',
  PENDING = 'pending',
}

@Schema()
export class Friend {
  @Prop({ required: true })
  profile_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  friend_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, enum: FriendTypeEnum, required: true })
  friendType: FriendTypeEnum;
}

export type FriendDocument = HydratedDocument<Friend>;
export const FriendSchema = SchemaFactory.createForClass(Friend);
