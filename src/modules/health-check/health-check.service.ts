import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  healthCheck(): boolean {
    return true;
  }
}
