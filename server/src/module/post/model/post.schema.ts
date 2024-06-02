import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProfileDocument } from '../../user/model/profile.schema';
import { Tag } from './tag.schema';
import { BaseSchema } from 'src/schema/base.schema';

export enum MediaEnum {
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
}

export enum PostAuthEnum {
  ONLY_ME = 'only',
  FRIENDS = 'friend',
  FOLLOWER = 'follower',
  ANYONE = 'anyone',
}

export class Media {
  type: MediaEnum;
  url: string;
}

@Schema()
export class Post extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: ProfileDocument;

  @Prop()
  content: string;

  @Prop()
  media: [Media];

  @Prop({ type: String, enum: PostAuthEnum })
  auth: PostAuthEnum;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tags: Tag[];
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
