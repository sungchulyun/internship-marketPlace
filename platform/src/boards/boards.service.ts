/* eslint-disable prettier/prettier */
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardRepository } from './board.repository';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBoardsDto } from './dto/SearchBoardsDto';
import { Page } from './page';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}
    //게시글 작성
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        if(!createBoardDto){
            throw new NotFoundException("You have a null value on each attributes");
        }
        return this.boardRepository.save(createBoardDto);

    }

    //단일 게시글 가져오기
    async getBoardById(id: number){
        const found = await this.boardRepository.findOne(id);
        if(!found){
            throw new NotFoundException('Cant find Board with id ${id}');
        }
        return found;
    }

    //전체 게시글 가져오기
    async getBoardAll(page: SearchBoardsDto){
        const total = await this.boardRepository.count();
        const goods = await this.boardRepository.find({
          take: page.getLimit(),
          skip: page.getOffset(),
        });
        return new Page(total, page.pageSize, goods);
      
        //return this.boardRepository.find();
    }
    
    //게시글 수정
    async UpdateBoard(id: number, updateBoardDto:UpdateBoardDto): Promise<Board>{
        const board = await this.boardRepository.findOne({
            where: {
                id,
            },
        });
        if(!board){
            throw new NotFoundException("There is no Information aboout that ID");
        }
        console.log(updateBoardDto);
        await this.boardRepository.update(id, updateBoardDto);          //오류 발생 범인
        const updateBoard = await this.boardRepository.findOne({
            where: {id,},
        });
        return updateBoard;
    }

    //게시글 삭제
    async DeleteBoard(id:number){
        const deleteBoard = await this.boardRepository.findOne({
            where:{
                id,},
        });
        if(!deleteBoard){
            throw new NotFoundException("There is no Information aboout that ID");
        }
         this.boardRepository.delete(deleteBoard);
         return "삭제 완료";
    }

    

}
