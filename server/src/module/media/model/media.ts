import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/module/user/model/profile.schema';
import { BaseSchema } from 'src/schema/base.schema';
import { MediaPathDocument } from './media_path';

export enum MediaType {
  STICKER = 'sticker',
  GIF = 'gif',
  EMOJI = 'emoji',
}

@Schema()
export class Media extends BaseSchema {
  @Prop({ type: String, enum: MediaType, default: MediaType.STICKER })
  type: MediaType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  })
  owner: Profile;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaPath' }] })
  listPath: Array<MediaPathDocument>;
}

export type MediaDocument = HydratedDocument<Media>;

export const MediaSchema = SchemaFactory.createForClass(Media);
MediaSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
MediaSchema.pre('find', function (next) {
  this.populate('listPath');
  next();
});
MediaSchema.post('find', function (data: MediaDocument[]) {
  data.map((media) => {
    if (media && media.listPath) {
      media.listPath.map((d) => {
        d.name = media.name + '/' + d._id;
      });
    }
  });
});
