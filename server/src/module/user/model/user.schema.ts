import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AuthType } from '../../auth/model/auth.schema';
import { Profile } from './profile.schema';
import { BaseSchema } from 'src/schema/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseSchema {
  @Prop({ type: String, enum: AuthType })
  typeAuth: AuthType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
