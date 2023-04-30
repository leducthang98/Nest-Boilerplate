import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { COMMON_CONSTANT } from './constants/common.constant';
import { AuthModule } from './modules/auth/auth.module';
import { CronModule } from './modules/cron/cron.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { HttpExceptionFilter } from './shared/filters/exception.filter';
import { JwtAuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ThrottlerBehindProxyGuard } from './shared/guards/throttler.guard';
import { ResponseTransformInterceptor } from './shared/interceptors/response.interceptor';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      ttl: COMMON_CONSTANT.THROTTLER.TTL,
      limit: COMMON_CONSTANT.THROTTLER.LIMIT,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      name: COMMON_CONSTANT.DATASOURCE.DEFAULT,
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.getMysqlConfig(COMMON_CONSTANT.DATASOURCE.DEFAULT),
    }),
    RedisModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        config: configService.getRedisConfig(),
      }),
    }),
    SharedModule,
    HealthCheckModule,
    AuthModule,
    CronModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
