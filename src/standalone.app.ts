import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HealthCheckModule } from "./modules/health-check/health-check.module";
import { HealthCheckController } from "./modules/health-check/health-check.controller";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const healthCheck = app.select(HealthCheckModule).get(HealthCheckController)
    console.info(healthCheck.heathCheck())
    app.close()
}

bootstrap()