import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { compare, hash } from 'bcryptjs';
import { RegisterRequestDto } from './dto/register-request.dto';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { RegisterResponseDto } from './dto/register-response.dto';
import { Role } from 'src/constants/role.constant';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { CACHE_CONSTANT } from 'src/constants/cache.constant';
import { Redis } from 'ioredis';
import { BaseException } from 'src/shared/filters/exception.filter';
import { ERROR } from 'src/constants/exception.constant';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  private redisInstance: Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.redisInstance = this.redisService.getClient(
      COMMON_CONSTANT.REDIS_DEFAULT_NAMESPACE,
    );
  }

  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(): string {
    return uuidv4();
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        username: loginRequestDto.username,
      },
    });

    if (!user) {
      throw new BaseException(ERROR.USER_NOT_EXIST);
    }

    const match = await compare(loginRequestDto.password, user.password);
    if (!match) {
      throw new BaseException(ERROR.WRONG_USERNAME_OR_PASSWORD);
    }

    const accessToken = this.generateAccessToken({
      userId: user.id,
      role: Role.Admin,
    });

    const signature = accessToken.split('.')[2];

    // TODO: store in redis with access token
    const refreshToken = this.generateRefreshToken();

    // save key into redis
    await this.redisInstance.sadd(
      `${CACHE_CONSTANT.SESSION_PREFIX}${user.id}`,
      signature,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(
    registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const checkUserExist = await this.userRepository.findOne({
      where: {
        username: registerRequestDto.username,
      },
    });

    if (checkUserExist) {
      throw new BaseException(ERROR.USER_EXISTED);
    }

    const hashPassword = await hash(
      registerRequestDto.password,
      COMMON_CONSTANT.BCRYPT_SALT_ROUND,
    );
    const userCreated: UserEntity = await this.userRepository.save({
      username: registerRequestDto.username,
      password: hashPassword,
    });
    return {
      id: userCreated.id,
      username: userCreated.username,
    };
  }

  async logout(token: string, userId: string): Promise<boolean> {
    const signature = token.split('.')[2];
    return Boolean(
      this.redisInstance.srem(
        `${CACHE_CONSTANT.SESSION_PREFIX}${userId}`,
        signature,
      ),
    );
  }

  async revokeUser(userId: string): Promise<boolean> {
    return Boolean(
      this.redisInstance.del(`${CACHE_CONSTANT.SESSION_PREFIX}${userId}`),
    );
  }
}
