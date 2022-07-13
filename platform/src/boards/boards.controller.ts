/* eslint-disable prettier/prettier */
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Body, Controller, Get, Param, Post, Render, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { render } from 'nunjucks';

@Controller('boards')
export class BoardsController {

    constructor(private boardService: BoardsService){}
                                                        //게시판 홈 페이지, 게시글 목록
    @Get('/')
    //@Render('boardhome.njk')
    async getAllBoard(@Res() res:Response){
        const boards = await this.boardService.getBoardAll();
        res.render('boardhome',  {boards:boards});
    }
                                                            //게시판 검색
                                                            /*
    @Get('/:id')
    getBoardById(@Param ('id') id:number): Promise<Board>{
        return this.boardService.getBoardById(id);
    }
                                                            */

                                                            //게시판 글 작성 랜더링
    @Get('/write')
    //@Render('boardwrite.njk')
    writeBoard(@Res() res:Response){
        res.render('boardwrite');
    }
    
                                                            //게시판 글 작성 POST
    @Post('/writePro')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardService.createBoard(createBoardDto);
    }
    
    }
