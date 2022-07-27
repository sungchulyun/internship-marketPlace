/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
            usernameField: 'email',
            password: 'password',
          });
        }
    
    async validate(payload){
        console.log("jwt strategy validation")
        const {email} = payload;
        const user:User = await this.userRepository.findOne({ email});

        if(!user) {
            throw new UnauthorizedException({message: "왜 안될까?"});
        }
        return user;
    }
}