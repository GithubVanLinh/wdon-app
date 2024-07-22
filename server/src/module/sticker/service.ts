import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SessionOption } from 'mongoose';

import { Sticker } from './model';
import { CreateStickerDto, CreateStickerGroupDto } from './dto/create';
import { FindStickerDto } from './dto/find';
import { UpdateStickerDto } from './dto/update';

@Injectable()
export class StickerService {
  constructor(
    @InjectModel(Sticker.name)
    private stickerModel: Model<Sticker>,
  ) {}

  async createGroup(body: CreateStickerGroupDto, opt?: SessionOption) {
    const group = new this.stickerModel({
      name: body.name,
      num: body.num,
      owner: body.owner,
      stickers: [],
    });

    return await group.save(opt);
  }

  async findGroup(groupId, opt?: SessionOption) {
    const group = await this.stickerModel.findById(groupId, null, opt);
    return group;
  }

  async create(body: CreateStickerDto, groupId: string, opt?: SessionOption) {
    const oldGroup = await this.findGroup(groupId, opt);
    const newSticker = [...oldGroup.stickers, body];
    const group = await this.stickerModel.findByIdAndUpdate(
      groupId,
      {
        stickers: newSticker,
      },
      opt,
    );

    return group;
  }

  async update(id: string, data: UpdateStickerDto, opt?: SessionOption) {
    const oldDoc = await this.stickerModel.findByIdAndUpdate(id, data, opt);
    return oldDoc;
  }

  async findById(id: string, opt?: SessionOption) {
    return await this.stickerModel.findById(id, null, opt);
  }

  async find(condition: FindStickerDto, opt?: SessionOption) {
    return await this.stickerModel.find(condition, null, opt);
  }

  async delete(id: string, opt?: SessionOption) {
    return await this.stickerModel.findByIdAndDelete(id, opt);
  }
}
