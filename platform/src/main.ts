/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import *as nunjucks from 'nunjucks';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
    );
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
