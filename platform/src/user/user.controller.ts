/* eslint-disable prettier/prettier */
import { UserService } from './user.service';
import { Controller, Get, Param, Post, Body, Render } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { isEmail } from 'class-validator';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
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
   
    /*@Post('/joining')
    @Render('')
    create(@Body() user: User){
        return this.userService.create(user);
    }
    */

    @Get('/join')
    @Render('signin.hbs')
    getUser() {
        return {message:'Index Page' };
    }
    @Post('/join')
    @Render('')
    check(@Body() user: User){
        return this.userService.create(user);
    }

}
