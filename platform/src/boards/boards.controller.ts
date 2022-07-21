/* eslint-disable prettier/prettier */
import { UpdateBoardDto } from './dto/update-board.dto';
import { editFileName, imageFileFilter } from './../utils/file-uploading.utils';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Bind, Body, Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Patch, Delete, Redirect, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { render } from 'nunjucks';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SearchBoardsDto } from './dto/SearchBoardsDto';
import { number, x } from 'joi';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}
    
    
    //게시판 홈 페이지, 게시글 목록
    @Get('/lists')
    @UsePipes(new ValidationPipe({ transform: true }))
    //@Render('boardhome.njk')
    async getAllBoard(@Query() page: SearchBoardsDto,
    @Res() res:Response){ 
        const pageNo = page.pageNo;
        const totalPage = await (await this.boardService.getBoardAll(page)).totalPage;
        const boards = (await this.boardService.getBoardAll(page)).boards
        res.render('boardHome', {boards : boards, pageNo : pageNo, totalPage: totalPage});

        
    }
    //게시판 검색
    @Get('/search')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getSearchBoards(@Query() page: SearchBoardsDto){
      return (await this.boardService.searchBoards(page)).boards;

    }

                                                           
    //게시판 상세페이지
    @Get('detail/:id')
    async getBoardById(@Param ('id') id:number, @Res() res:Response){
        const board = await this.boardService.getBoardById(id);
        res.render('boardDetail', {board: board});

    }
                                                            

    //게시판 글 작성 페이지 렌더링
    @Get('/write')
    //@Render('boardwrite.njk')
    writeBoard(@Res() res:Response){
        res.render('boardWrite');
    }
    
    //게시판 글 작성 POST
    @Post('/writePro')
    @Redirect('http://localhost:8000/boards/lists', 302)
    @UsePipes(ValidationPipe) 
    @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ) //한개의 사진 post
    createBoard(@Body() createBoardDto: CreateBoardDto, @UploadedFile() file): Promise<Board>{
    const response = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };                  //const file = file.filename으로 받아서 넘기면 오류뜸, 무슨 이슈인지 모르겠음
      createBoardDto.image= 'http://localhost:8000/'+ response.filename;
      return this.boardService.createBoard(createBoardDto);
    }
 
    //글 수정 페이지 랜더링
    @Get('update/:id')
    async updateBoard(@Param ('id') id:number, @Res() res:Response){
      const board = await this.boardService.getBoardById(id);
      res.render('boardUpdate', {board: board})
    }

    //게시글 수정
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() body) {
      console.log(body);
      //return this.boardService.UpdateBoard(id, updateBoardDto);
    }

    //게시글 삭제
    @Delete('/delete/:id')
    remove(@Param('id') id: number) {
      return this.boardService.DeleteBoard(id);
    }
 
 
}