import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  logger = new Logger(MessageGateway.name);

  @WebSocketServer()
  server: Server;

  async sendMessage(message: CreateMessageDto, listClient: string[]) {
    this.logger.log('list client', listClient);
    this.server.to(listClient).emit('message', message);
  }
}
