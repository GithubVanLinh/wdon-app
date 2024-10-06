import { Module } from '@nestjs/common';
import { MangaController } from './controller';

@Module({
  imports: [],
  controllers: [MangaController],
  providers: [],
  exports: [],
})
export class MangaModule {}
