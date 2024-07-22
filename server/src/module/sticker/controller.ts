import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { StickerService } from './service';
import {
  CreateStickerDto,
  CreateStickerGroupDto,
  CreateStickersDto,
} from './dto/create';
import { FindStickerDto } from './dto/find';
import { UpdateStickerDto } from './dto/update';
import { ProfileId } from '../auth/decorators/user';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { removeFolder, saveFileToLocal } from 'src/utils';

@ApiTags('Stickers')
@Controller('sticker')
export class StickerController {
  constructor(private stickerSerivce: StickerService) {}

  @Post('/group')
  async createStickerGroup(
    @ProfileId() profileId: string,
    @Body() group: CreateStickerGroupDto,
  ) {
    const dto: CreateStickerGroupDto = {
      name: group.name,
      num: 0,
      owner: profileId,
    };
    const data = await this.stickerSerivce.createGroup(dto);
    return data;
  }

  @Post('/:group')
  @UseInterceptors(FilesInterceptor('stickers'))
  async addSticker(
    @ProfileId() profileid: string,
    @Body() body: CreateStickersDto,
    @Param('group') groupId: string,
    @UploadedFiles()
    stickers: Express.Multer.File[],
  ) {
    const list = body.list;
    if (body.list.length !== stickers.length) {
      throw new BadRequestException(
        `length of list: ${body.list.length} not equal sticker length: ${stickers.length}`,
      );
    }
    const group = await this.stickerSerivce.findGroup(groupId);
    if (!group) {
      throw new BadRequestException(`groupid: ${groupId} not found`);
    }
    const keys = group.stickers.map((stic) => stic.key);

    for (const k of list) {
      if (keys.includes(k)) {
        throw new BadRequestException(`${k} already exists in ${groupId}`);
      }
    }

    const rec: { key: string; value: string }[] = [];

    const folderSave = `uploads/stickers/${groupId}`;
    for (let i = 0; i < list.length; i++) {
      const name = saveFileToLocal(folderSave, stickers[i]);
      rec.push({ key: list[i], value: name });
    }

    try {
      const listPromise = [];
      for (const obj of rec) {
        const stic = await this.stickerSerivce.create(
          {
            key: obj.key,
            path: `/stickers/${groupId}/${obj.value}`,
          },
          groupId,
        );

        listPromise.push(stic);
      }

      return await this.stickerSerivce.findGroup(groupId);
    } catch (e) {
      removeFolder(folderSave);
    }
    // return await this.stickerSerivce.create(body);
  }

  @Patch('/:id')
  async update(
    @ProfileId() profileid: string,
    @Param('id') id: string,
    @Body() body: UpdateStickerDto,
  ) {
    return await this.stickerSerivce.update(id, body);
  }

  @Delete('/:id')
  async delete(@ProfileId() profileid: string, @Param('id') id: string) {
    return await this.stickerSerivce.delete(id);
  }

  @Get('/')
  async find(@ProfileId() profileid: string, @Query() query: FindStickerDto) {
    return await this.stickerSerivce.find(query);
  }

  @Get('/:id')
  async findOne(@ProfileId() profileid: string, @Param('id') id: string) {
    return await this.stickerSerivce.findById(id);
  }
}
