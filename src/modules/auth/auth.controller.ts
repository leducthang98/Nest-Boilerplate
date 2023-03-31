import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/constants/role.constant';
import { JwtDecodedData, Public, Roles } from 'src/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RevokeUserRequestDto } from './dto/revoke-user-request.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  @Post('register')
  @Public()
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerRequestDto);
  }

  @Post('logout')
  logout(@Req() req: Request, @JwtDecodedData() data: JwtPayload) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(token, data.userId);
  }

  @Get('verify')
  @Roles([Role.Admin])
  verify(@JwtDecodedData() data: JwtPayload): JwtPayload {
    return data;
  }

  @Post('revoke-user')
  @Roles([Role.Root])
  revokeUser(@Body() revokeUserRequestDto: RevokeUserRequestDto) {
    return this.authService.revokeUser(revokeUserRequestDto.id);
  }
}
