import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  iat?: string;

  @ApiProperty()
  exp?: string;
}
