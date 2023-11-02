import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/constants/role.constant';
import {
  JwtDecodedData,
  Public,
  Roles,
} from 'src/shared/decorators/auth.decorator';

import { AuthService } from './auth.service';
import { JwtPayload } from '../../shared/dto/jwt-payload.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import type { LoginResponseDto } from './dto/login-response.dto';
import type { LogoutResponseDto } from './dto/logout-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import type { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import type { RegisterResponseDto } from './dto/register-response.dto';
import { RevokeUserRequestDto } from './dto/revoke-user-request.dto';
import type { RevokeUserResponseDto } from './dto/revoke-user-response.dto';

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

  @Get('verify')
  @Roles([Role.Admin])
  verify(@JwtDecodedData() data: JwtPayload): JwtPayload {
    return data;
  }

  @Post('register')
  @Public()
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerRequestDto);
  }

  @Post('refresh-token')
  @Public()
  refreshToken(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(
      refreshTokenRequestDto.accessToken,
      refreshTokenRequestDto.refreshToken,
    );
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @JwtDecodedData() data: JwtPayload,
  ): Promise<LogoutResponseDto> {
    const token = req.headers.authorization.split(' ')[1];
    const logoutResult = await this.authService.logout(token, data.userId);

    return {
      logoutResult,
    };
  }

  @Post('revoke-user')
  @Roles([Role.Root])
  async revokeUser(
    @Body() revokeUserRequestDto: RevokeUserRequestDto,
  ): Promise<RevokeUserResponseDto> {
    const revokeResult = await this.authService.revokeUser(
      revokeUserRequestDto.id,
    );

    return {
      revokeResult,
    };
  }
}
