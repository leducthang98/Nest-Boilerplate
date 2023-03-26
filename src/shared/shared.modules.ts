import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { DatabaseUtilService } from './services/database-util.service';

const providers = [ApiConfigService, DatabaseUtilService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule { }
