import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { LoggerFormat } from './logger/type';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const logdata = new LoggerFormat();
      logdata.body = request.body;
      logdata.ip = ip;
      logdata.path = request.path;
      logdata.user = request.user;
      logdata.method = request.method;
      logdata.statusCode = statusCode;
      logdata.agent = userAgent;
      logdata.response = JSON.stringify(response.get('data'));
      logdata.contentLength = contentLength;

      // this.logger.log(logdata);
    });

    next();
  }
}
