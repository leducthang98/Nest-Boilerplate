import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { UserEntity } from 'src/entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const entites = [UserEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature(entites, COMMON_CONSTANT.DATASOURCE.DEFAULT),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
