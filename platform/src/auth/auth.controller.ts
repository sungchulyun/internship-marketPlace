import { LocalAuthGurad } from './local-auth.guard';
/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards,  Get, Res, Req, Redirect, Render } from '@nestjs/common';
import { Response ,Request } from 'express';
import { JwtAuthGuard } from './jwt-auth-guards';

@Controller('auth')
export class AuthController {
    constructor(private authSerivce: AuthService){}
    
 
   //회원 가입 페이지 랜더링
    @Get('/join')
    userJoin(@Req() req:Request, @Res() res:Response){
        res.render('join')
    }

    //회원가입
    @Post('joinPro')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authSerivce.signUp(authcredentialsDto);
    }

    //로그인 페이지 랜더링
     @Get('/login')
    userLogin(@Res() res:Response){
    res.render('login');
    }
      
    //로그인 -> 토큰 발급 -> 쿠키
    @Post('loginPro')
    @Render('boardHome')
    async login(@Body() authcredentialsDto: AuthCredentialsDto, @Res() res: Response): Promise<any>{
        const email = authcredentialsDto.email;
        const password = authcredentialsDto.password;
        const jwt = await this.authSerivce.validateUser(email, password );      //아이디, 비밀번호 검증
        res.cookie('jwt',jwt.accessToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000 //1day
        });
        console.log(res.cookie)
    }
 }
