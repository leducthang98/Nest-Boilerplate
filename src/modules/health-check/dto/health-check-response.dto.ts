import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty()
  appName: string;

  @ApiProperty()
  status: boolean;
}
