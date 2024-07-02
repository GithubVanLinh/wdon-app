import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MeidaService } from './service';
import { MediaType } from './model/media';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateStickersDto } from './dto/create_stickers';
import { ProfileId } from '../auth/decorators/user';
import { FileRequiredValidationPipe } from 'src/utils/pipe/require_file';
import { deleteFilesFromLocal, saveFileToLocal } from 'src/utils';
import { MediaPath } from 'src/decorators/fullpath';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MeidaService) {}

  @MediaPath(['listPath.name', 'name'])
  @Get('/stickers/:name')
  async getListStickers(@Param('name') name: string) {
    return await this.mediaService.find(MediaType.STICKER, name);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('/stickers')
  async createStickers(
    @UploadedFiles(
      new ParseFilePipe({ validators: [new FileRequiredValidationPipe({})] }),
    )
    files: Array<Express.Multer.File>,
    @Body() body: CreateStickersDto,
    @ProfileId() profileId: string,
  ) {
    const listName = [];
    for (const f of files) {
      const name = saveFileToLocal('uploads/stickers', f);
      listName.push(name);
    }

    try {
      const res = await this.mediaService.create(
        MediaType.STICKER,
        profileId,
        body.name,
        listName,
      );

      return res;
    } catch (e) {
      deleteFilesFromLocal('uploads/stickers', listName);
      throw new BadRequestException(e.message);
    }
  }

  @Get('/emojis/:group')
  async getListEmojis() {
    return await this.mediaService.find(MediaType.STICKER);
  }

  @Get('/gifs/:group')
  async getListGifs() {
    return await this.mediaService.find(MediaType.STICKER);
  }
}
