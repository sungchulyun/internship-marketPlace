/* eslint-disable prettier/prettier */
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Controller, Get, Param, Post, Body, Render, UseGuards, Session, Request, Res } from '@nestjs/common';
import { User } from '../auth/user.entity';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private authService: AuthService,){}
    /*
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    */
    @Get(':email')
    async findOne(@Param('email')email : string): Promise<User>{
        const finduser =  await this.userService.findOne(email);
        return Object.assign({
            data: finduser,
        })
    }
    /*
    @UseGuards(AuthGuard('local'))
	@Post()
	async login(@Session() session, @Request() req, @Res({ passthrough: true}) response) {
		const access_token = await (await this.authService.login(req.user)).access_token;
		await response.cookie('Authorization', access_token);
		return req.user;
   */
    }
    /*@Post('/joining')
    @Render('')
    create(@Body() user: User){
        return this.userService.create(user);
    }
    

    @Get('/join')
    @Render('signin.hbs')
    getUser() {
        return {message:'Index Page' };
    }*/
}

}
