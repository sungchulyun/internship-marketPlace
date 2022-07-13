/* eslint-disable prettier/prettier */
import { editFileName, imageFileFilter } from './../utils/file-uploading.utils';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Bind, Body, Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { render } from 'nunjucks';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
                                                            
    @Get('detail/:id')
    getBoardById(@Param ('id') id:number): Promise<Board>{
        return this.boardService.getBoardById(id);
    }
                                                            

    //게시판 글 작성 랜더링
    @Get('/write')
    //@Render('boardwrite.njk')
    writeBoard(@Res() res:Response){
        res.render('boardwrite');
    }
    
    //게시판 글 작성 POST
    @Post('/writePro')
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
      };
    createBoardDto.image= response.path;
    return this.boardService.createBoard(createBoardDto);
}
async uploadedFile(@UploadedFile() file) {
    console.log(file);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
  
  
 
/*
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
   
  @Post('multiple')                 //배열로 여러 장의 사진 post
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
  */
}