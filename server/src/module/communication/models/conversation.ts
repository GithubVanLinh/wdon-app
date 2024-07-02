import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ProfileDocument } from 'src/module/user/model/profile.schema';
import { BaseSchema } from 'src/schema/base.schema';

@Schema()
export class Participant {
  @Prop({ type: String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Types.ObjectId;
}

export enum ConversationTypeEnum {
  PERSONAL = 'personal',
  GROUP = 'group',
}

@Schema()
export class Conversation extends BaseSchema {
  @Prop({ type: Array<Participant> })
  participants?: Participant[];

  @Prop({ type: String, enum: ConversationTypeEnum })
  type: ConversationTypeEnum;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  owner?: ProfileDocument;
}

export type ConversationDocument = HydratedDocument<Conversation>;

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
ConversationSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
