import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../model/tag.schema';
import { ClientSession, Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}
  async createTags(session: ClientSession, listName: string[]) {
    const listTags = [];
    for (const name of listName) {
      const oldTag = await this.tagModel
        .findOne({ name: name })
        .session(session);
      if (oldTag) {
        listTags.push(oldTag);
        continue;
      }
      const newTag = await new this.tagModel({ name: name }).save({
        session,
      });
      listTags.push(newTag);
    }

    return listTags;
  }
}
