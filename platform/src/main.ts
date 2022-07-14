/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import *as nunjucks from 'nunjucks';
import * as path from 'path';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
    );  
    
    app.useStaticAssets(path.join(__dirname, '..', 'files')),{
    prefix: 'media'}
    //http://localhost:8000/media/aaa.png -> http://localhost:8000/aaa.png 형태로 저장됨, prefix 적용이 안되는 이슈 ?

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  nunjucks.configure("views", {
    express : app,
    autoescape: true,
    watch: true,
    noCache : true,
    
  });
  app.set('view engine', 'njk');

  
  await app.listen(8000);
  
}
bootstrap();
