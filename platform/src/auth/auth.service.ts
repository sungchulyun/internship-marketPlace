import { User } from './user.entity';
/* eslint-disable prettier/prettier */
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    //회원가입
    async signUp(authcredentialsDto : AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authcredentialsDto);
    }

    //로그인
    async signIn(authcredentialsDto: AuthCredentialsDto): Promise<void>{
        const { email, password} = authcredentialsDto;
        const user = await this.userRepository.findOne({email});
        
    }
        /*
        const hash = await (await this.userRepository.findOne({email})).password;
        if(bcrypt.compare(password, hash)){
            return user;
        }
        /*
        return null;
    }
    
    /*

    async login(user: User){
        const payload = { email: user.email}
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
      */
}
