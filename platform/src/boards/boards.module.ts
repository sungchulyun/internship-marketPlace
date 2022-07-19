/* eslint-disable prettier/prettier */
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardRepository } from './board.repository';

@Module({

  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './files',
      }),
    }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
