import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

const entites = [UserEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entites)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
