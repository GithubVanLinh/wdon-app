import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/schema/base.schema';
import { getFullMediaUrl } from 'src/utils/url';

@Schema()
export class StickerImage {
  @Prop({ type: String, required: true })
  key: string;
  @Prop({ type: String, required: true })
  path: string;
}

@Schema()
export class Sticker extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Array<StickerImage> })
  stickers: StickerImage[];

  @Prop({ type: String, required: true })
  owner: string;

  @Prop({ type: Number, required: true })
  num: number;
}

export type StickerDocument = HydratedDocument<Sticker>;

export const StickerSchema = SchemaFactory.createForClass(Sticker);
StickerSchema.pre('save', function (next) {
  const date = new Date();
  this.updatedAt = date;
  this.createdAt = date;
  next();
});

StickerSchema.post('find', (data: StickerDocument[], next) => {
  data.map((media) => {
    if (media && media.stickers) {
      media.stickers.map((d) => {
        d.path = getFullMediaUrl(d.path);
      });
    }
  });
  next();
});

StickerSchema.post('findOne', (data: StickerDocument, next) => {
  if (data && data.stickers) {
    data.stickers.map((d) => {
      d.path = getFullMediaUrl(d.path);
    });
  }
  next();
});
