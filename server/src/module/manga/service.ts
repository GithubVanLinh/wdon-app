import { InjectModel } from '@nestjs/mongoose';
import { Manga } from './model';
import { Model } from 'mongoose';
import { CreateMangaDto } from './dto/create';

export class MangaService {
  constructor(@InjectModel(Manga.name) private mangaModel: Model<Manga>) {}

  async createManga(uploader: string, dataDTO: CreateMangaDto) {
    const manga = new this.mangaModel({ ...dataDTO, uploader: uploader });
    return await manga.save();
  }

  async finishCreateManaga(
    id: string,
    media: { head: string; mangas: string[] },
  ) {
    const manga = await this.mangaModel.findByIdAndUpdate(id, {
      mangas: media.mangas,
      headImage: media.head,
    });

    return manga;
  }
}
