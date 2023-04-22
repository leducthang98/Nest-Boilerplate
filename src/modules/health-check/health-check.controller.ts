import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { HealthCheckService } from './health-check.service';
import { Public } from 'src/shared/decorators/auth.decorator';
import { HealthCheckResponseDto } from './dto/health-check-response.dto';

@Controller('health-check')
@ApiTags('HealthCheck')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly configService: ApiConfigService,
  ) {}

  @ApiOkResponse({
    description: 'health check',
    type: HealthCheckResponseDto,
    isArray: false,
  })
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
