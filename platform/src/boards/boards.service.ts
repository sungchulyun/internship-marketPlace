import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
/* eslint-disable prettier/prettier */
import { BoardRepository } from './board.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        
        return this.boardRepository.save(createBoardDto);
    }

    async getBoardById(id: number): Promise <Board>{
        const found = await this.boardRepository.findOne(id);
        if(!found){
            throw new NotFoundException('Cant find Board with id ${id}');
        }
        return found;
    }
    async getBoardAll(): Promise <Board[]>{
        return this.boardRepository.find();
    }
}
