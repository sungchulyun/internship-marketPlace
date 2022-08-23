import { User } from 'src/auth/user.entity';
import { JwtAuthGuard } from './../auth/jwt-auth-guards';
/* eslint-disable prettier/prettier */
import { editFileName, imageFileFilter } from './../utils/file-uploading.utils';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Bind, Body, Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Patch, Delete, Redirect, Query, DefaultValuePipe, ParseIntPipe, UseGuards, UseFilters } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SearchBoardsDto } from './dto/SearchBoardsDto';
import { GetUser } from 'src/auth/get-user.decorator';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { number } from 'joi';
import { HttpExceptionFilter } from 'src/HttpExceptionFilter';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});

@UseFilters(HttpExceptionFilter)
@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}

    //게시판 홈 페이지, 게시글 목록
    @Get('/lists')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAllBoard(@Query() page: SearchBoardsDto,
    @Res() res:Response, @Req() req:Request){ 
        req.cookies['jwt'];
        const pageNo = 1;
        const totalPage = await (await this.boardService.getBoardAll(page)).totalPage;
        const boards = (await this.boardService.getBoardAll(page)).boards
        res.render('boardHome', {boards : boards, pageNo : pageNo, totalPage: totalPage});
    }

    //게시판 검색
    @Get('/search')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getSearchBoards(@Query() page: SearchBoardsDto, @Res() res:Response){
      const response = {
        title : page.title,
        category : page.category
      }
      console.log(response)
      const searchBoards =  (await this.boardService.searchBoards(page)).boards;
      res.render('boardHome', {boards : searchBoards});
    }

                                                           
    //게시판 상세페이지
    @Get('detail/:id')
    async getBoardById(@Param ('id') id:number, @Res() res:Response){
        const board = await this.boardService.getBoardById(id);
        res.render('boardDetail', {board: board});

    }
                                                            

    //게시판 글 작성 페이지 렌더링
    @UseGuards(JwtAuthGuard)
    @Get('/write')
    //@Render('boardwrite.njk')
    writeBoard(@Res() res:Response){
        res.render('boardWrite');
    }


    @UseGuards(JwtAuthGuard)
    @Post('/writePro')
    @Redirect('http://localhost:8000/boards/lists', 302)
    @UsePipes(ValidationPipe)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: multerS3({
          s3: s3,
          bucket: AWS_S3_BUCKET_NAME,
          acl: 'public-read',
          key: function(request, file, cb) {
            cb(null, `${Date.now().toString()} - ${file.originalname}`);
          },
        }),
        fileFilter: imageFileFilter,
      }),
    ) 
    async  createBoard(@Body() createBoardDto: CreateBoardDto,@GetUser() user:User ,@UploadedFile() file): Promise<any>{
      console.log(createBoardDto);
      createBoardDto.image= file.location;
      return this.boardService.createBoard(createBoardDto, user);
    }

 
    //글 수정 페이지 랜더링
    @Get('update/:id')
    async updateBoard(@Param ('id') id:number, @Res() res:Response){
      const board = await this.boardService.getBoardById(id);
      res.render('boardUpdate', {board: board})
    }


    //게시글 수정
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async update(@Param('id') id: number, @Body() body) {
      console.log(body);
      //return this.boardService.UpdateBoard(id, updateBoardDto);
    }


    //게시글 삭제
   
    @Delete('/delete/:id')
    async remove(@Param('id') id: number) {
      return await this.boardService.DeleteBoard(id);
    }


    //NFT 구매하기
    @UseGuards(JwtAuthGuard)
    @Get('/detail/buy/:id')
    async nftBuy(@Param ('id') id:number, @Res() res:Response){
      const board = await this.boardService.getBoardById(id);
      res.render('boardBuy', {board: board});
    }

    @UseGuards(JwtAuthGuard)
    @Post('/detailPro/:id')
    async getFile(@Param('id')id:number){
      return await (await this.boardService.getBoardById(id)).image;
    }
 
 
}