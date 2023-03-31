import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RevokeUserRequestDto {
  @ApiProperty({
    required: true,
    example: 'some-uuid',
  })
  @IsNotEmpty()
  id: string;
}
