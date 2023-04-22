import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  refreshToken: string;
}
