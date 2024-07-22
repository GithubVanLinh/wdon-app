import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Sticker, StickerSchema } from './model';
import { StickerController } from './controller';
import { StickerService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sticker.name, schema: StickerSchema }]),
  ],
  controllers: [StickerController],
  providers: [StickerService],
  exports: [StickerService],
})
export class StickerModule {}
