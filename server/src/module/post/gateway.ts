import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PostGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: Socket) {
    console.log('client disconnected: ', client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected: ', client.id);
    console.log('args: ', client.handshake.headers.authorization);

    client.emit(
      'message',
      JSON.stringify({
        authorization: client.handshake.headers.authorization,
      }),
      'ok',
    );
  }

  @WebSocketServer()
  server: Server;

  sendAll() {
    this.server.emit('message', 'hahaa');
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   console.log(data);
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }
}
