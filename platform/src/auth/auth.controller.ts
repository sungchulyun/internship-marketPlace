/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards,  Get, Res, Req } from '@nestjs/common';
import { Response ,Request } from 'express';
import { string } from 'joi';

@Controller('auth')
export class AuthController {
    constructor(private authSerivce: AuthService){}
    
                                    //회원가입 API
    @Post('/signup')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authSerivce.signUp(authcredentialsDto);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() authcredentialsDto: AuthCredentialsDto, @Res() res: Response): Promise<any>{
        const email = authcredentialsDto.email;
        const password = authcredentialsDto.password;
        const jwt = await this.authSerivce.validateUser(email, password );      //아이디, 비밀번호 검증
        console.log(jwt);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);    //헤더에 담아서  토큰 전달
       // console.log(res.json(jwt));
        return res.json(jwt);
        
    }
    

    @Post('/test')
    test(@Req() req){
        console.log('req', req);
    }

    /**@Get('/authenticate')
    @UseGuards(AuthGuard())isAuthenticated(@Req() req: Request): any {
        const user:any = req.user;
        console.log(user);
        return user;
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
