/* eslint-disable prettier/prettier */
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
    
    
    app.useStaticAssets(path.join(__dirname, '..', 'files')),
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  await app.listen(8000);
  
}
bootstrap();
