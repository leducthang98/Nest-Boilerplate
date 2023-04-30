import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { HealthCheckModule } from './modules/health-check/health-check.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const healthCheck = app.select(HealthCheckModule).get(HealthCheckController);
  console.info(healthCheck.heathCheck());
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  app.close();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
