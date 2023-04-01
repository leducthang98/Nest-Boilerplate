import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR } from 'src/constants/exception.constant';

export class BaseException extends HttpException {
  constructor(response: string | Record<string, any>, status?: number) {
    super(response, status || HttpStatus.BAD_REQUEST);
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
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
    const response = ctx.getResponse<Response>();

    const code = error?.response?.code;
    const message = error?.response?.message;

    const status =
      !error.status || code === -1
        ? HttpStatus.INTERNAL_SERVER_ERROR
        : error.status;

    response.status(status).json({
      code: code || ERROR.UNKNOWN_ERROR.code,
      message: message || ERROR.UNKNOWN_ERROR.message,
      data: null,
    });
  }
}
