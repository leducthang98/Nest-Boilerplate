import { Module } from '@nestjs/common';

import { DefaultCronService } from './default.cron.service';

@Module({
  providers: [DefaultCronService],
})
export class CronModule {}
