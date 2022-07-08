/* eslint-disable prettier/prettier */
import { User } from './user.entity';
import { jwtConstants } from './constants';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : process.env.JWT_KEY,
        });
    }
    
    async validate(payload: User){
        return { email : payload.email};
    }
}