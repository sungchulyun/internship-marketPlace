import { Controller, Get, Render } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'testing!' };
  }
  @Get()
  getHello(): string {
    console.log('hello');
    return this.appService.getHello();
  }

  @Get()
  findAll(): Observable<any[]> {
    return of([]);
  }
}
