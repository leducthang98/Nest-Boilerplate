import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const users = await this.authService.login()
    console.log(users)
    return {
      accessToken: '',
      refreshToken: ''
    }
  }
}
