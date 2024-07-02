import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/schema/base.schema';
import { Conversation } from '../communication/models/conversation';

@Schema()
export class Message extends BaseSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  })
  conversation: Conversation;

  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String })
  to: string;

  @Prop({ type: String })
  message?: string;

  @Prop({ type: String })
  media?: string;

  @Prop({ type: String })
  gif?: string;

  @Prop({ type: String })
  emoji?: string;

  @Prop({ type: String })
  sticker?: string;
}

export type MessageDocument = HydratedDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
