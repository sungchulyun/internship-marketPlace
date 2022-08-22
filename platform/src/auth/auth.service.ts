import { ConfigService } from '@nestjs/config';
/* eslint-disable prettier/prettier */
import { Payload } from './security/payload.interface';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
        private readonly configService: ConfigService
    ) {}

    //회원가입
    async signUp(authcredentialsDto : AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authcredentialsDto);
    }

    //비밀번호 해쉬 검사 이후 토큰 발급
    async validateUser(email :string  , password: string ){
        const hash = await (await this.userRepository.findOne({email})).password;
        const validatePassword = await(bcrypt.compare(password, hash));
        if(!validatePassword){
            throw new UnauthorizedException('login failed');
        }  
        const payload: Payload = { email };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRTATION_TIME')}`;
    }

    async getById(email: string) {
        const user = await this.userRepository.findOne({ email });
        if (user) {
          return user;
        }
        throw new HttpException(
          '사용자가 존재하지 않습니다.',
          HttpStatus.NOT_FOUND,
        );
      }
      
      
      //로그아웃
      public getCookieForLogOut() {     
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
      }
   
}
