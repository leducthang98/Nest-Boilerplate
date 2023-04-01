import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './configs/swagger.config';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.modules';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService: ApiConfigService = app
    .select(SharedModule)
    .get(ApiConfigService);

  const port = configService.getEnv('PORT');
  const appName = configService.getEnv('APP_NAME');

  app.use(helmet());
  app.setGlobalPrefix(`api`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enable('trust proxy');
  app.enableCors();
  app.enableShutdownHooks();

  initSwagger(app, appName);

  await app.listen(port, () => {
    console.info(`🚀 server start at ${port}!`);
  });
}
bootstrap();
