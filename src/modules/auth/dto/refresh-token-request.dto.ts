import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
