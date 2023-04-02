import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export interface LogStructure {
  timestamp: string;
  request: {
    url: string;
    method: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}

@Injectable()
export class LogService {
  logger: winston.Logger;

  constructor() {
    const transport: DailyRotateFile = new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '1g',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      transports: [transport],
    });
  }

  info(data: string) {
    this.logger.info(data);
  }

  error(data: string) {
    this.logger.error(data);
  }
}
