import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { ProfileService } from '../user/services/profile';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { PayloadJWT } from '../auth/types/payload';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>
{
  logger = new Logger('Gateway');
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    console.log('client disconnected: ', client.id);
  }
  async handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected: ', client.id);
    const bearerToken = client.handshake.headers.authorization;
    const token = bearerToken.split(' ')[1];
    try {
      const parseData = await this.jwtService.verifyAsync<PayloadJWT>(token);
      if (!parseData) {
        client.disconnect(true);
      } else {
        client.send(
          JSON.stringify({
            message: `Hello ${parseData.username}. Welcome to join this server!`,
          }),
        );

        client.join(parseData.profile_id);

        client.send(
          JSON.stringify({
            message: `Join ${parseData.profile_id}`,
          }),
        );
      }
    } catch (e) {
      client.send({ data: 'something went wrongs' });
      client.disconnect(true);
    }
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
