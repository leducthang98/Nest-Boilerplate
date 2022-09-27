import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [HealthCheckModule],
})
export class AppModule {}
