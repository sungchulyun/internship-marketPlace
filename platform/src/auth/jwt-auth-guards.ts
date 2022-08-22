/* eslint-disable prettier/prettier */

import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

    handleRequest(err, user, info){
        if(err ||  !user){
            throw err || new UnauthorizedException();
        }
        return user;
    }
    }