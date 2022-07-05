import { User } from './user/user.entity';
/* eslint-disable prettier/prettier */
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nftweb-mysql.ce6bsnpqk01h.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'sungchul',
      password: '123456789',
      database: 'nftweb-db',
      entities: [User],
      synchronize: true,
    }), UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
