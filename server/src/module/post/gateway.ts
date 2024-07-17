import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PostGateway {
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
