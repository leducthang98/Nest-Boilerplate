import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
  @ApiProperty()
  logoutResult: boolean;
}
