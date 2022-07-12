/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
              (request) => {
                return request?.cookies?.Authentication;
              },
            ]),
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            
          });
        }
    
    async validate(payload){
        const {email} = payload;
        const user:User = await this.userRepository.findOne({ email});

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}