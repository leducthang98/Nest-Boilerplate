import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  async healthCheck(): Promise<boolean> {
    return true;
  }
}
