import { Module } from '@nestjs/common';
import { MangaController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manga, MangaSchema } from './model';
import { MangaService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manga.name, schema: MangaSchema }]),
  ],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [],
})
export class MangaModule {}
