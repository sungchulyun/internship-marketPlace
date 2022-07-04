import { SuccessInterceptor } from './../interceptors/success.interceptors';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  
  @Get()
  getAllcat(){
    throw new HttpException({success :false ,message: 'api is broken'}, 401);
    return 'all cat';
  }

  @Get(':id'){
    getOneCat(){
        return 'one cat';
    }
  }

  @Post()
  createCat() {
    return 'create cat';
  }
  
  @Put(':id')
  updateCat() {
    return 'update cat';
  }
  
  @Patch(':id')
  updatePartialCat(){
    return ;
  }
  
  @Delete(':id')
  deleteCat(){
    return 'delete cat';
  }
   
}
