import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Redis } from 'ioredis';
import { CACHE_CONSTANT } from 'src/constants/cache.constant';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { IS_PUBLIC } from 'src/decorators/auth.decorator';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload.dto';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private redisInstance: Redis;

  constructor(
    private jwtService: JwtService,
    private apiConfigService: ApiConfigService,
    private reflector: Reflector,
    private redisService: RedisService,
  ) {
    this.redisInstance = this.redisService.getClient(
      COMMON_CONSTANT.REDIS_DEFAULT_NAMESPACE,
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.apiConfigService.getJwtConfig().secret,
      });

      const signature = token.split('.')[2];

      const isExistSignature = await this.redisInstance.sismember(
        `${CACHE_CONSTANT.SESSION_PREFIX}${payload.userId}`,
        signature,
      );

      if (!isExistSignature) {
        throw new UnauthorizedException();
      }

      request[COMMON_CONSTANT.JWT_DECODED_REQUEST_PARAM] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
