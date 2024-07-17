import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { LoggerFormat } from 'src/module/logger/type';

type Response<T> = T & { took: number };

@Injectable()
export class TimeExecuteInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  logger = new Logger(TimeExecuteInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const timer = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const userAgent = req.get('user-agent') || '';
    const contentLength = res.get('content-length');
    const { body, user, ip, method, path } = req;
    const datalog = new LoggerFormat();
    datalog.body = body;
    datalog.agent = userAgent;
    datalog.contentLength = contentLength;
    datalog.ip = ip;
    datalog.method = method;
    datalog.path = path;
    datalog.user = user;
    return next.handle().pipe(
      map((data): Response<T> => {
        const took = Date.now() - timer;
        datalog.response = JSON.stringify(data);
        datalog.statusCode = res.statusCode;
        this.logger.log(datalog);

        return {
          took: took,
          ...data,
        };
      }),
      catchError((e) => {
        if (e instanceof HttpException) {
          datalog.response = JSON.stringify(e.getResponse());
        } else {
          JSON.stringify(e);
        }
        datalog.statusCode = res.statusCode;
        this.logger.log(datalog);
        throw e;
      }),
    );
  }
}
