import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/model/user.schema';
import { BaseSchema } from 'src/schema/base.schema';

export enum AuthType {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

@Schema()
export class Auth extends BaseSchema {
  @Prop({ type: String, enum: AuthType, default: AuthType.LOCAL })
  authType: AuthType;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export type AuthDocument = HydratedDocument<Auth>;

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
