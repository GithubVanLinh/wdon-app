import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/schema/base.schema';

export enum FriendTypeEnum {
  FRIEND = 'friend',
  FOLLOWING = 'following',
  PENDING = 'pending',
}

@Schema()
export class Friend extends BaseSchema {
  @Prop({ required: true })
  profile_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  friend_id: mongoose.Schema.Types.ObjectId;

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
