import { AuthService } from './../auth/auth.service';
import { UserService } from './../user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { BoardsController } from './boards.controller';
import { JwtModule } from '@nestjs/jwt';
/* eslint-disable prettier/prettier */
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';


@Module({

  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './files',
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRTATION_TIME')}s`,
        },
      }),
    }),
    AuthModule,
    PassportModule
  ],
  controllers: [BoardsController, ],
  providers: [BoardsService, JwtStrategy, UserService, AuthService],
})
export class BoardsModule {}
