import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  getEnv(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(`${key} not set in env yet`);
    }

    return value;
  }

  mysqlConfig(): TypeOrmModuleOptions {
    const typeOrmConfig = {
      type: this.getEnv(`DATABASE_TYPE`),
      host: this.getEnv(`DATABASE_HOST`),
      port: Number(this.getEnv(`DATABASE_PORT`)),
      username: this.getEnv(`DATABASE_USERNAME`),
      password: this.getEnv(`DATABASE_PASSWORD`),
      database: this.getEnv(`DATABASE_NAME`),
      logging: Boolean(this.getEnv(`DATABASE_LOG_ENABLE`)),
      ssl: { rejectUnauthorized: false },
      synchronize: false,
      autoLoadEntities: true,
      extra: {
        connectionLimit: this.getEnv(`DATABASE_LIMIT_CONNECTION`),
      },
    };

    return typeOrmConfig as TypeOrmModuleOptions;
  }

  jwtConfig(): JwtModuleOptions {
    return {
      secret: this.getEnv('JWT_ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: +this.getEnv('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    };
  }
}
