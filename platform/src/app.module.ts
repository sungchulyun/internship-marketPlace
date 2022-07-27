/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    }),
    ConfigModule.forRoot({ 
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRTATION_TIME: Joi.number().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule, BoardsModule, AuthModule, ConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
