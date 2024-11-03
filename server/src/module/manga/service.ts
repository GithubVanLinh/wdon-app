import { InjectModel } from '@nestjs/mongoose';
import { Manga } from './model';
import { Model } from 'mongoose';
import { CreateMangaDto } from './dto/create';
import { GetListMangaDTO } from './dto/getListMangaDto';
import { BadRequestException } from '@nestjs/common';

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

  async getListManga(condition: GetListMangaDTO) {
    const limit = condition.pageLength || 10;
    const skip = condition.page < 1 ? 0 : (condition.page - 1) * limit;
    const listManga = await this.mangaModel.find(
      {
        // name: {
        //   $regex: '.*' + condition.search + '.*',
        // },
      },
      {
        name: true,
        chapter: true,
        createdAt: true,
        headImage: true,
        existsName: true,
      },
      { limit: limit, skip: skip, sort: { createdAt: 'desc' } },
    );

    return listManga;
  }

  async findNameExsist(name: string) {
    const reg = new RegExp(name, 'g');
    const result = await this.mangaModel.find({
      search_string: reg,
    });

    console.log(result);
    return result;
  }

  async getManga(id: string) {
    return await this.mangaModel.findById(id);
  }
}
