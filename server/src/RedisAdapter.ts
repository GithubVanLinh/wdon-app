import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: `redis://127.0.0.1:6379`,
      password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
    });
    const subClient = pubClient.duplicate();

    console.log('connecting');
    await Promise.all([pubClient.connect(), subClient.connect()]);
    console.log('connected');

    pubClient.on('error', (err) => {
      console.log(err.message);
    });

    subClient.on('error', (err) => {
      console.log(err.message);
    });
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
