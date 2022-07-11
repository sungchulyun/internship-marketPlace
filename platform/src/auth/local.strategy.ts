/* eslint-disable prettier/prettier */

import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    
    /*
    async validate(loginuser: User): Promise<User>{
        const user = await this.authService.signIn(loginuser);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
    */
}