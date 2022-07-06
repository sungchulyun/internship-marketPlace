/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/boards.entity";
import { User } from './../user/user.entity';
export const typeORMConfig : TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'nftweb-mysql.ce6bsnpqk01h.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
        username: 'sungchul',
        password: '123456789',
        database: 'nftweb-db',
        entities: [Board, User],
        synchronize: true,

}