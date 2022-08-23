/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception:HttpException, host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        console.log(status)

        if(status == 401){
            //response.render('join', {message: '로그인이 필요한 서비스입니다.'});
            response.redirect('/auth/login?flag=0');
        }
        else if(status == 404){
            //response.render('join', {message: '아이디와 비밀번호를 확인해주세요.'});
            response.redirect('/auth/login?flag=1')
        }
    }
}