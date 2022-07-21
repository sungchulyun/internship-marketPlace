/* eslint-disable prettier/prettier */
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardRepository } from './board.repository';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBoardsDto } from './dto/SearchBoardsDto';
import { Page } from './page';
import { Like } from 'typeorm';

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

    

    //게시물 검색
    async searchBoards(page : SearchBoardsDto){

        const {sortBy, category, title} = page;     //정렬방식, 카테고리, 제목에 포함된 내용 기반 검색
        console.log(page);
        
        let total, sortObj, found;
        if(!sortBy) {

        }else{
            switch(sortBy){
                case 'LOWPRICE':
                    sortObj = { prize : "ASC"};
                    break;
                case 'NEW':
                    sortObj = { CreatedDate : "DESC"};
                    break;
            }
        }
        if(!category) {
            total = await this.boardRepository.count();
            found = await this.getPagination(page, category, title);
        }else {
            total = await this,this.boardRepository.count({category});
            found = await this.getPaginationByCategory(page, category, title, sortObj);
        }
        return new Page(total, page.pageSize, found);
    }
    async getPaginationByCategory(page, category, title, sortObj){
        console.log(page, category, title, sortObj);
        const boards = await this.boardRepository.find({
            where:  { 
            category: category,    
            title: title
            },
            take: page.getLimit(),
            skip: page.getOffset(),
            order: sortObj,
        });
        console.log(boards);
        return boards;
    }

    async getPagination(page, sortObj, title){
        console.log(sortObj);
        const boards = await this.boardRepository.find({
            where: {title: Like(`%${title}%`)},
            take : page.getLimit(),
            skip : page.getOffset(),
            order: sortObj,
        });
        return boards;
    }
    
}
