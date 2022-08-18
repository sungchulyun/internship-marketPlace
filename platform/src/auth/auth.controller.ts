import { LocalAuthGurad } from './local-auth.guard';
/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards,  Get, Res, Req, Redirect, Render } from '@nestjs/common';
import { Response ,Request, request } from 'express';
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
    @Render('join')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
    
        return this.authSerivce.signUp(authcredentialsDto);
    }

      
    //로그인 -> 토큰 발급 -> 쿠키
    @UseGuards(LocalAuthGurad)
    @Post('loginPro')
    @Render('boardHome')
    async login(@Body() authcredentialsDto: AuthCredentialsDto, @Res() res: Response): Promise<any>{


        const email = authcredentialsDto.email;
        const password = authcredentialsDto.password;
        const cookie = await this.authSerivce.validateUser(email, password);      //아이디, 비밀번호 검증
        res.setHeader('Set-Cookie', cookie);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    authenticate(@Req() request: Request) {

      const user = request.user;
      return user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('logOut')
    async logOut(@Req() req: Request, @Res() res: Response) {

      res.setHeader(
        'Set-Cookie',
        this.authSerivce.getCookieForLogOut(),
      );
      return res.sendStatus(200);
    }
 }
