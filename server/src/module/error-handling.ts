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
    const message =
      (excception.getResponse() as any).message ?? excception.message;
    return [excception.getStatus(), message];
  }

  return [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error'];
}
