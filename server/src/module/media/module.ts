import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './model/media';
import { MediaController } from './controller';
import { MeidaService } from './service';
import { MediaPath, MediaPathSchema } from './model/media_path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MongooseModule.forFeature([
      { name: MediaPath.name, schema: MediaPathSchema },
    ]),
  ],
  controllers: [MediaController],
  providers: [MeidaService],
  exports: [],
})
export class MediaModule {}
