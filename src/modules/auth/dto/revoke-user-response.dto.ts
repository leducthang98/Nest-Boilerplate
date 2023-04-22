import { ApiProperty } from '@nestjs/swagger';

export class RevokeUserResponseDto {
  @ApiProperty()
  revokeResult: boolean;
}
