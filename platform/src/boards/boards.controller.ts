import { User } from 'src/auth/user.entity';
import { JwtAuthGuard } from './../auth/jwt-auth-guards';
/* eslint-disable prettier/prettier */
import { editFileName, imageFileFilter } from './../utils/file-uploading.utils';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Bind, Body, Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Patch, Delete, Redirect, Query, DefaultValuePipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SearchBoardsDto } from './dto/SearchBoardsDto';
import { GetUser } from 'src/auth/get-user.decorator';


/** */
@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}

    @Get('/klaytn')
    getKlaytn(@Res() res:Response){
      res.render('klaytn')
    }

    @Get('/sib')
    gettest(@Res() res:Response){
      res.render('sib')
    }
    

    //게시판 홈 페이지, 게시글 목록
    @Get('/lists')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAllBoard(@Query() page: SearchBoardsDto,
    @Res() res:Response, @Req() req:Request){ 
        req.cookies['jwt'];
        const pageNo = page.pageNo;
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
    
    //게시판 글 작성 POST
    @UseGuards(JwtAuthGuard)
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
    createBoard(@Body() createBoardDto: CreateBoardDto,@GetUser() user:User ,@UploadedFile() file): Promise<Board>{
    const response = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };                  //const file = file.filename으로 받아서 넘기면 오류뜸, 무슨 이슈인지 모르겠음
      createBoardDto.image= 'http://localhost:8000/'+ response.filename;
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
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    remove(@Param('id') id: number) {
      return this.boardService.DeleteBoard(id);
    }

    //NFT 구매하기
    @UseGuards(JwtAuthGuard)
    @Get('/detail/buy/:id')
    async nftBuy(@Param ('id') id:number, @Res() res:Response){
      const board = await this.boardService.getBoardById(id);
      res.render('boardBuy', {board: board});
    }
 
 
}