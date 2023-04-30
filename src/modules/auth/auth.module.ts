import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { COMMON_CONSTANT } from 'src/constants/common.constant';

const entites = [UserEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entites, COMMON_CONSTANT.DATASOURCE.DEFAULT)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
