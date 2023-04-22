import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/constants/role.constant';
import {
  JwtDecodedData,
  Public,
  Roles,
} from 'src/shared/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RevokeUserRequestDto } from './dto/revoke-user-request.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { RevokeUserResponseDto } from './dto/revoke-user-response.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'return access token and refresh token',
    type: LoginResponseDto,
    isArray: false,
  })
  @Post('login')
  @Public()
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  @ApiOkResponse({
    description: 'verify return jwt infomation',
    type: JwtPayload,
    isArray: false,
  })
  @Get('verify')
  @Roles([Role.Admin])
  verify(@JwtDecodedData() data: JwtPayload): JwtPayload {
    return data;
  }

  @ApiOkResponse({
    description: 'register user, return userId and username',
    type: RegisterResponseDto,
    isArray: false,
  })
  @Post('register')
  @Public()
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerRequestDto);
  }

  @ApiOkResponse({
    description: 'use refresh-token to gain new access-token and refresh-token',
    type: RefreshTokenResponseDto,
    isArray: false,
  })
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

  @ApiOkResponse({
    description: 'logout, revoke one session',
    type: LogoutResponseDto,
    isArray: false,
  })
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

  @ApiOkResponse({
    description: 'revoke all sessions of one user',
    type: RevokeUserResponseDto,
    isArray: false,
  })
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
