import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  InjectDataSource,
  InjectRepository,
} from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DatabaseUtilService } from 'src/shared/services/database-util.service';
import {
  DataSource,
  Repository,
} from 'typeorm';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginResponseDto } from './dto/login-response.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly databaseUtilService: DatabaseUtilService,
  ) { }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        username
      }
    })

    if (user && user.password === password) {
      return user
    }

    return null
  }

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload)
  }

  async login(user: UserEntity): Promise<LoginResponseDto> {
    const payload: JwtPayload = {
      userId: user.id,
      role: 'ADMIN'
    }
    
    const accessToken = await this.generateAccessToken(payload)

    return {
      accessToken,
      refreshToken: ''
    }
  }


}
