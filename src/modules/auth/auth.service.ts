import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DatabaseUtilService } from 'src/shared/services/database-util.service';
import { DataSource, Repository } from 'typeorm';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { compare, hash } from 'bcrypt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { RegisterResponseDto } from './dto/register-response.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        username: loginRequestDto.username,
      },
    });

    if (!user) {
      throw new Error('USER_NOT_EXIST'); // TODO: ERROR HANDLER
    }

    const match = await compare(loginRequestDto.password, user.password);
    if (!match) {
      throw new Error('WRONG_USERNAME_OR_PASSWORD'); // TODO: ERROR HANDLER
    }

    const accessToken = this.generateAccessToken({
      userId: user.id,
      role: 'ADMIN',
    });

    return {
      accessToken,
      refreshToken: '',
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
      throw new Error('USER_EXISTED'); // TODO: ERROR HANDLER
    }

    let hashPassword = await hash(
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
}
