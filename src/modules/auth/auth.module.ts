import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const entites = [UserEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entites)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
