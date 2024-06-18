import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/schema/base.schema';
import { Media } from 'src/utils/config/media';
import { getFullMediaUrl } from 'src/utils/url';

@Schema()
export class Profile extends BaseSchema {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  background: string;

  @Prop()
  dayOfBirth: Date;

  @Prop()
  link: string;
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});

ProfileSchema.post('find', (data: ProfileDocument[]) => {
  data.map((d) => {
    d.background = d.background
      ? getFullMediaUrl(d.background)
      : getFullMediaUrl(Media.default.headImage);
    d.avatar = d.avatar
      ? getFullMediaUrl(d.avatar)
      : getFullMediaUrl(Media.default.avatar);
  });
});

ProfileSchema.post('findOne', (data: ProfileDocument) => {
  data.background = data.background
    ? getFullMediaUrl(data.background)
    : getFullMediaUrl(Media.default.headImage);

  data.avatar = data.avatar
    ? getFullMediaUrl(data.avatar)
    : getFullMediaUrl(Media.default.avatar);
});
