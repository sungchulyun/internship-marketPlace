import { LocalAuthGurad } from './local-auth.guard';
/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards,  Get, Res, Req } from '@nestjs/common';
import { Response ,Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authSerivce: AuthService){}
    
                                    //회원가입 API
    @Post('/signup')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authSerivce.signUp(authcredentialsDto);
    }

    @Post('login')
    async login(@Body() authcredentialsDto: AuthCredentialsDto, @Res() res: Response): Promise<any>{
        const jwt = await this.authSerivce.validateUser(authcredentialsDto);      //아이디, 비밀번호 검증
        console.log(jwt);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);    //헤더에 담아서  토큰 전달
        console.log(res.json(jwt));
        return res.json(jwt);
    }
    @Get('/authenticate')
    @UseGuards(AuthGuard())isAuthenticated(@Req() req: Request): any {
        const user:any = req.user;
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
