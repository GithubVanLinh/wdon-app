import {
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

@Controller('manga')
@ApiTags('Manga')
export class MangaController {
  constructor(private configService: ConfigService) {}

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
}
