import { Param } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authSerivce: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/signup')
    async login(@Request() req){
        return req.user;
    }
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authSerivce.signUp(authcredentialsDto);
    }
}
