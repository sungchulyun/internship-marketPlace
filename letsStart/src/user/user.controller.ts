/* eslint-disable prettier/prettier */
import { UserService } from './user.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { User } from './user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param(':id')id : string):string{
        return 'this returns user${id}';
    }
    @Post()
    create(@Body() user: User){
        return this.userService.create(user);
    }


}
