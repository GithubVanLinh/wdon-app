import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    console.log('ex', exception);
    const ctx = host.switchToHttp();

    const [httpStatus, message] = getHttpStatus(exception);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

function getHttpStatus(excception: unknown): [HttpStatus, string] {
  if (excception instanceof HttpException) {
    return [
      excception.getStatus(),
      excception.message + JSON.stringify(excception.getResponse()),
    ];
  }

  return [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error'];
}
