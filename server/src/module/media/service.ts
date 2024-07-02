import { InjectModel } from '@nestjs/mongoose';
import { Media, MediaType } from './model/media';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { MediaPath } from './model/media_path';
import { StickerNameHasBeenExistsError } from './errors/media-exists';

@Injectable()
export class MeidaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<Media>,
    @InjectModel(MediaPath.name) private mediaPathModel: Model<MediaPath>,
  ) {}

  async find(type: MediaType, name?: string) {
    return await this.mediaModel.find({ type: type, name: name });
  }

  async create(type: MediaType, owner: string, name: string, medias: string[]) {
    const session = await this.mediaModel.startSession();
    session.startTransaction();
    try {
      const isNameExists = await this.checkname(name);
      if (isNameExists) {
        throw new StickerNameHasBeenExistsError(name);
      }

      const listMedia = [];
      for (const m of medias) {
        const mD = new this.mediaPathModel({ name: m }).save({ session });
        listMedia.push(mD);
      }
      const listNameMedia = await Promise.all(listMedia);
      const data = await new this.mediaModel({
        type: type,
        listPath: listNameMedia,
        name: name,
        owner: owner,
      }).save({ session });
      await session.commitTransaction();
      await session.endSession();
      return data;
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();
      throw e;
    }
  }

  async checkname(name: string): Promise<boolean> {
    const result = await this.mediaModel.findOne({ name: name });
    return !!result;
  }
}
