import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/schema/base.schema';

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
