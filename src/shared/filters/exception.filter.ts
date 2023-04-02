import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import moment from 'moment';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { ERROR } from 'src/constants/exception.constant';
import { LogService, LogStructure } from 'src/shared/services/logger.service';

export class BaseException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(response: string | Record<string, any>, status?: number) {
    super(response, status || HttpStatus.BAD_REQUEST);
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}

  async catch(
    error: {
      response: {
        message: string;
        code: number;
      };
      status: number;
      message: string;
      name: string;
    },
    host: ArgumentsHost,
  ): Promise<void> {
    console.error(error);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const code = error?.response?.code;
    const message = error?.response?.message;

    const status =
      !error.status || code === -1
        ? HttpStatus.INTERNAL_SERVER_ERROR
        : error.status;

    const responsePayload = {
      code: code || ERROR.UNKNOWN_ERROR.code,
      message: message || ERROR.UNKNOWN_ERROR.message,
      data: null,
    };

    const errorLogStructure: LogStructure = {
      timestamp: moment().format(COMMON_CONSTANT.TIME.DATE_TIME_FORMAT),
      request: {
        url: request.url,
        method: request.method,
        params: request.params,
        body: request.body,
      },
      response: {
        status,
        body: responsePayload,
      },
    };

    this.logService.error(JSON.stringify(errorLogStructure));

    response.status(status).json(responsePayload);
  }
}
