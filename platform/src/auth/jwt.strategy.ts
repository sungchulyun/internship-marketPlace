/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from './security/payload.interface';
import { Request } from 'express';
import { AuthService } from './auth.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService,
        private authService: AuthService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                  return request?.cookies?.Authentication;
                },
              ]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
            usernameField: 'email',
            password: 'password',
          });
        }
    
        async validate(payload: Payload) {
          return this.authService.getById(payload.email);
        }
}