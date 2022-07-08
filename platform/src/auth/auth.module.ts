/* eslint-disable prettier/prettier */
import { JwtService, JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { Module, Sse } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    UserModule,
    JwtModule.register({ 
      secret : process.env.JWT_KEY,
      signOptions: {expiresIn: 3600},
    }),
  ],
  exports: [TypeOrmModule, AuthService, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, JwtService],
})
export class AuthModule {}
