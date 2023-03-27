import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginRequestDto
  })
  @Post('login')
  async login(
    @Request() req,
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify(@Request() req) {
    return req.user
  }
}
