import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SessionOption } from 'mongoose';

import { Message } from './model';
import { CreateMessageDto } from './dto/create';
import { FindMessageDto } from './dto/find';
import { UpdateMessageDto } from './dto/update';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async create(body: CreateMessageDto, opt?: SessionOption) {
    const newDoc = await new this.messageModel({
      ...body,
      conversation: body.conversation_id,
    }).save(opt);
    return newDoc;
  }

  async update(id: string, data: UpdateMessageDto, opt?: SessionOption) {
    const oldDoc = await this.messageModel.findByIdAndUpdate(id, data, opt);
    return oldDoc;
  }

  async findById(id: string, opt?: SessionOption) {
    return await this.messageModel.findById(id, null, opt);
  }

  async find(
    conversation: string,
    condition: FindMessageDto,
    opt?: SessionOption,
  ) {
    return await this.messageModel.find(
      { conversation: conversation },
      null,
      opt,
    );
  }

  async delete(id: string, opt?: SessionOption) {
    return await this.messageModel.findByIdAndDelete(id, opt);
  }
}
