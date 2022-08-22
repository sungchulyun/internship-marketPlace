/* eslint-disable prettier/prettier */
import { HttpStatus, HttpException } from '@nestjs/common';


export class UnauthorizedException extends HttpException {
    constructor() {
      super('로그인이 필요한 서비스입니다.', HttpStatus.UNAUTHORIZED);
    }
  }