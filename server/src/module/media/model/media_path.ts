import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class MediaPath {
  @Prop({ type: String })
  name: string;
}

export const MediaPathSchema = SchemaFactory.createForClass(MediaPath);

export type MediaPathDocument = HydratedDocument<MediaPath>;
