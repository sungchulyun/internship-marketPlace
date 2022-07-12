/* eslint-disable prettier/prettier */
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Body, Controller, Get, Param, Post, Render, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('boards')
export class BoardsController {

    constructor(private boardService: BoardsService){}

    @Get('/')
    //@Render('boardhome.njk')
    async getAllBoard(@Res() res:Response){
        const boards = await this.boardService.getBoardAll();
        console.log(boards);
        res.render('boardhome',  {boards:boards});
    }
    @Get('/:id')
    getBoardById(@Param ('id') id:number): Promise<Board>{
        return this.boardService.getBoardById(id);
    }
    @Post()
    @Render('write.njk')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardService.createBoard(createBoardDto);
    }
    
    }
