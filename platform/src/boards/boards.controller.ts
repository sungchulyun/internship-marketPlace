import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
/* eslint-disable prettier/prettier */
import { BoardsService } from './boards.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('boards')
export class BoardsController {

    constructor(private boardService: BoardsService){}

    @Get('/')
    getAllBoard(){
        return this.boardService.getBoardAll();
    }
    @Get('/:id')
    getBoardById(@Param ('id') id:number): Promise<Board>{
        return this.boardService.getBoardById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardService.createBoard(createBoardDto);
    }
    
    }
