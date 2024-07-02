import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FULL_PATH } from 'src/decorators/fullpath';
import { setValueRecursion } from 'src/utils/object';
import { getFullMediaUrl } from 'src/utils/url';

@Injectable()
export class MediaLinkInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const listPath = this.reflector.getAllAndOverride<Array<string>>(
      FULL_PATH,
      [context.getHandler(), context.getClass()],
    );

    if (listPath) {
      return next.handle().pipe(
        map((data) => {
          listPath.map((each) => {
            setValueRecursion(data, each.split('.'), (cur) =>
              getFullMediaUrl(cur),
            );
          });
          return data;
        }),
      );
    } else {
      return next.handle();
    }
  }
}
