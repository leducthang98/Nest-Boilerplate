import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/auth.decorator';
import { ApiConfigService } from 'src/shared/services/api-config.service';

import { HealthCheckResponseDto } from './dto/health-check-response.dto';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
@ApiTags('HealthCheck')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly configService: ApiConfigService,
  ) {}

  @Get()
  @Public()
  heathCheck(): HealthCheckResponseDto {
    const appName = this.configService.getEnv('APP_NAME');

    const status = this.healthCheckService.healthCheck();

    return {
      appName,
      status,
    };
  }
}
