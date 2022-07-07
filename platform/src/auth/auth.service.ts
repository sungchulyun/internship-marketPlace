import { User } from './user.entity';
/* eslint-disable prettier/prettier */
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signUp(authcredentialsDto : AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authcredentialsDto);
    }
    async validateUser(email:string, pass:string): Promise<any>{
        const user = await this.userService.findOne(email);
        if(user && user.password === pass){
            const{ password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User){
        const payload = { email: user.email}
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
      
}
