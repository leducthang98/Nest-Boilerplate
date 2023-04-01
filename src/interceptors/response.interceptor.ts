import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { RESPONSE_MESSAGE } from 'src/decorators/response.decorator';

export interface Response<T> {
  code: number;
  message: string;
  data: T;
}
@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: COMMON_CONSTANT.RESPONSE_SUCCESS.CODE,
          message:
            this.reflector.get<string>(
              RESPONSE_MESSAGE,
              context.getHandler(),
            ) || COMMON_CONSTANT.RESPONSE_SUCCESS.MESSAGE,
          data: data.data || data,
        };
      }),
    );
  }
}
