/* eslint-disable prettier/prettier */
import { JwtService, JwtModule} from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
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
      UserModule, 
      JwtModule,
  ],
      
  exports: [TypeOrmModule, AuthService, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, JwtService],
})
export class AuthModule {}
