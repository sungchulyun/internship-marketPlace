/* eslint-disable prettier/prettier */
import { UserService } from './user.service';
import { Controller, Get, Param, Post, Body, Render } from '@nestjs/common';
import { User } from './user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    /*
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    */
    @Get()
    findOne(@Param(':id')id : string):string{
        return 'this returns user${id}';
    }
    @Get('/join')
    @Render('join.hbs')
    getJoin() {
        return {message:'Index Page' };
    }
    /*@Post('/joining')
    @Render('')
    create(@Body() user: User){
        return this.userService.create(user);
    }
    */

    @Get('/signin')
    @Render('signin.hbs')
    getUser() {
        return {message:'Index Page' };
    }
    @Post('/signining')
    @Render('')
    check(@Body() user: User){
        return this.userService.create(user);
    }

}
