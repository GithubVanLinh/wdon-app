import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/schema/base.schema';
import { ProfileDocument } from '../user/model/profile.schema';

@Schema()
export class Manga extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  author?: string;

  @Prop()
  chapter?: string;

  @Prop()
  existsName?: string;

  @Prop({ default: 'oneshot' })
  type: 'long' | 'oneshot';

  @Prop()
  headImage: string;

  @Prop()
  mangas: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  uploader: ProfileDocument;
}

export type MangaDocument = HydratedDocument<Manga>;
export const MangaSchema = SchemaFactory.createForClass(Manga);
MangaSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});
