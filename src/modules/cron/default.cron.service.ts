import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DefaultCronService {
  @Cron(CronExpression.EVERY_12_HOURS)
  defaultJob() {
    console.info('default cron job');
  }
}
