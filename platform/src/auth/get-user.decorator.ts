/* eslint-disable prettier/prettier */
import { createParamDecorator } from "@nestjs/common";
import { User } from 'src/auth/user.entity';
import { ExecutionContext } from '@nestjs/common';
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User=> {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})