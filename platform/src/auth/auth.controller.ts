import { User } from './user.entity';
/* eslint-disable prettier/prettier */

import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authSerivce: AuthService){}
    
                                    //회원가입 API
    @Post('/signup')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authSerivce.signUp(authcredentialsDto);
    }
    @Post('/signin')
    async signIn(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return await this.authSerivce.signIn(authcredentialsDto);
    }

    /*
    @UseGuards(LocalAuthGurad)
    @Post('/login')
    async login(@Request() req) {
        return this.authSerivce.login(req.user);
      }
    @UseGuards(JwtAuthGuard)
    @Get('')
    getProfile(@Request() req){
        return req.user;
    }
    */
    
   
}
