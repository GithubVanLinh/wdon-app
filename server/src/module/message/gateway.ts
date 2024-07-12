import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageDocument } from './model';

interface ServerToClient {
  'new-message': (message: MessageDocument) => void;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  logger = new Logger(MessageGateway.name);

  @WebSocketServer()
  server: Server<ServerToClient>;

  async sendMessage(message: MessageDocument, listClient: string[]) {
    this.server.to(listClient).emit('new-message', message);
  }
}
