import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from './services/api-config.service';
import { DatabaseUtilService } from './services/database-util.service';

const providers = [ApiConfigService, DatabaseUtilService];

const jwtModule = JwtModule.registerAsync({
  inject: [ApiConfigService],
  useFactory: (configService: ApiConfigService) => {
    return configService.jwtConfig();
  },
});

@Global()
@Module({
  providers,
  imports: [HttpModule, jwtModule],
  exports: [...providers, HttpModule, jwtModule],
})
export class SharedModule {}
