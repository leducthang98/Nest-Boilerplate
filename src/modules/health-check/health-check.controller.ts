import { Controller, Get } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly configService: ApiConfigService,
  ) {}

  @Get()
  async heathCheck() {
    const appName = this.configService.getEnv('APP_NAME');

    const status = await this.healthCheckService.healthCheck();

    return {
      appName,
      status,
    };
  }
}
