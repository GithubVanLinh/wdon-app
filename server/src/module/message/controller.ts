import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { MessageService } from './service';
import { CreateMessageDto } from './dto/create';
import { FindMessageDto } from './dto/find';
import { UpdateMessageDto } from './dto/update';
import { ProfileId } from '../auth/decorators/user';
import { ApiTags } from '@nestjs/swagger';
import { MessageGateway } from './gateway';
import { ConversationService } from '../communication/service/conversation';
import { ConversationTypeEnum } from '../communication/models/conversation';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(
    private messageSerivce: MessageService,
    private gateway: MessageGateway,
    private coversationService: ConversationService,
  ) {}

  @Post('/')
  async create(@ProfileId() profile: string, @Body() body: CreateMessageDto) {
    const message = { ...body, from: profile };
    const conversation = await this.coversationService.findById(
      body.conversation_id,
    );
    const data = await this.messageSerivce.create(message);
    await this.gateway.sendMessage(
      data,
      conversation.participants.map((p) => p.profile.toString()),
    );
    return data;
  }

  @Patch('/:id')
  async update(
    @ProfileId() profile: string,
    @Param('id') id: string,
    @Body() body: UpdateMessageDto,
  ) {
    return await this.messageSerivce.update(id, body);
  }

  @Delete('/:id')
  async delete(@ProfileId() profile: string, @Param('id') id: string) {
    return await this.messageSerivce.delete(id);
  }

  @Get('/:conversationId')
  async find(
    @ProfileId() profile: string,
    @Query() query: FindMessageDto,
    @Param('conversationId') conversationId: string,
  ) {
    return await this.messageSerivce.find(conversationId, query);
  }

  // @Get('/:id')
  // async findById(@ProfileId() profile: string, @Param('id') id: string) {
  //   return await this.messageSerivce.findById(id);
  // }
}
