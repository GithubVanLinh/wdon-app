import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from '../module/user/model/profile.schema';

export enum RelationshipType {
  FRIEND = 'friend',
  FOLLOW = 'follow',
  BLOCK = 'block',
}

@Schema()
export class Relationship {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  otherProfile: Profile;

  @Prop({ type: String, enum: RelationshipType })
  type: RelationshipType;
}

export type RelationshipDocument = HydratedDocument<Relationship>;
export const RelationshipSchema = SchemaFactory.createForClass(Relationship);
