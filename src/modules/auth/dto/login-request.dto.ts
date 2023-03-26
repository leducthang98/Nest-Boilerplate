import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    required: true,
    example: 'leducthang98@gmail.com',
  })
  @IsNotEmpty()
  @MinLength(6)
  @IsEmail()
  username: string;

  @ApiProperty({
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
