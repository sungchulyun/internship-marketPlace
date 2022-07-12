/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import { UserRepository } from '../auth/user.repository';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRTATION_TIME')}`,
      },
    }),
  }),
  TypeOrmModule.forFeature([UserRepository]),
],
  exports: [TypeOrmModule, UserModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, JwtStrategy],
})
export class UserModule {}
