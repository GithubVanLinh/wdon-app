import {
  ArgumentsHost,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LoggerFormat } from './type';

@Injectable()
export class MyLogger implements LoggerService {
  constructor(private elastc: ElasticsearchService) {}

  log(message: any, ...optionalParams: any[]) {
    const time = new Date();

    if (message instanceof LoggerFormat) {
      this.elastc.index({
        index: 'logs',
        document: {
          ...message,
        },
      });
    } else {
      console.log(time.toLocaleTimeString(), optionalParams, message);
    }
  }
  error(message: any, ...optionalParams: any[]) {
    const time = new Date();
    console.error(time.toLocaleTimeString(), optionalParams, message);
  }
  warn(message: any, ...optionalParams: any[]) {
    const time = new Date();
    console.warn(time.toLocaleTimeString(), optionalParams, message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }
  verbose?(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }
  fatal?(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
