import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from '../../user/model/profile.schema';
import { Tag } from './tag.schema';

export enum MediaEnum {
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
}

export class Media {
  type: MediaEnum;
  url: string;
}

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop()
  content: string;

  @Prop()
  media: [Media];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tags: Tag[];
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
