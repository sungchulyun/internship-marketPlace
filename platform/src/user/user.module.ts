import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import { UserRepository } from '../auth/user.repository';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [TypeOrmModule, UserModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
})
export class UserModule {}
