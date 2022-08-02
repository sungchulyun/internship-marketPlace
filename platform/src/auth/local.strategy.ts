/* eslint-disable prettier/prettier */

import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField: 'email',
            password: 'password',
        });
    }

    
    
    async validate(email: string, password: string): Promise<any>{
        console.log("localstrategy strategy validation")
        const user = await this.authService.validateUser(email, password);
        if(!user){
            throw new UnauthorizedException({message : '이메일과 비밀번호를 확인해주세요.'});
        }
        return user;
    }
    
}