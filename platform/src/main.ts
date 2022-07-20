/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import *as nunjucks from 'nunjucks';
import * as path from 'path';
import { join } from 'path';
import methodOverride = require('method-override');
import bodyParser = require('body-parser');


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
    );  
    new ValidationPipe({
      /**
       * whitelist: DTO에 없은 속성은 무조건 거른다.
       * forbidNonWhitelisted: 전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생합니다.
       * transform: 네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체입니다.
       *            객체를 자동으로 DTO로 변환을 원하면 transform 값을 true로 설정한다.
       * disableErrorMessages: Error가 발생 했을 때 Error Message를 표시 여부 설정(true: 표시하지 않음, false: 표시함)
       *                       배포 환경에서는 true로 설정하는 걸 추천합니다.
       */
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      // disableErrorMessages: true,
    }),
  
    app.useStaticAssets(path.join(__dirname, '..', 'files'), {
      prefix: '/media',
    }),
    
    //http://localhost:8000/media/aaa.png -> http://localhost:8000/aaa.png 형태로 저장됨, prefix 적용이 안되는 이슈 ?
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.use(methodOverride('_method'));
    nunjucks.configure("views", {
      express : app,
      autoescape: true,
      watch: true,
      noCache : true,
    
    });
    app.set('view engine', 'njk');
    app.use(methodOverride('_method'));

    await app.listen(8000);
  
    }
    bootstrap();
