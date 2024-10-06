import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import { saveFile, saveFileToLocal } from 'src/utils';
import { CreateMangaDto } from './dto/create';
import { MangaService } from './service';
import { ProfileId } from '../auth/decorators/user';

@Controller('manga')
@ApiTags('Manga')
export class MangaController {
  constructor(
    private configService: ConfigService,
    private mangaService: MangaService,
  ) {}

  @Get('/info')
  info() {
    return 'works';
  }

  @Post('/test')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'head', maxCount: 1 }, { name: 'data' }]),
  )
  test(
    @UploadedFiles()
    files: {
      head?: Express.Multer.File[];
      data?: Express.Multer.File[];
    },
  ) {
    const dir = path.join(this.configService.get('MEDIA_DIR'), 'manga/id_name');
    return saveFile(dir, files.head[0]);
  }

  @Post('/upload')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'head', maxCount: 1 }, { name: 'mangas' }]),
  )
  async create(
    @UploadedFiles()
    files: {
      head?: Express.Multer.File[];
      mangas?: Express.Multer.File[];
    },
    @Body() createMangaDto: CreateMangaDto,
    @ProfileId() profileId: string,
  ) {
    console.log('upload');
    const mangas = files.mangas;
    if (!files.mangas) {
      throw new BadRequestException('Missing manga image');
    }
    let headFile: Express.Multer.File;
    if (!files.head) {
      headFile = mangas[0];
    } else {
      headFile = files.head[0];
    }
    const { name, type = 'oneshot' } = createMangaDto;
    try {
      const mangaInfo = await this.mangaService.createManga(
        profileId,
        createMangaDto,
      );
      const dir = path.join(
        this.configService.get('MEDIA_DIR'),
        'manga',
        mangaInfo.id,
      );
      const head = saveFile(dir, headFile);
      const list = [];
      for (const img of mangas) {
        const fname = saveFile(dir, img);
        list.push(fname);
      }

      const res = await this.mangaService.finishCreateManaga(mangaInfo.id, {
        head: head,
        mangas: list,
      });

      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
