import { User } from 'src/auth/user.entity';
/* eslint-disable prettier/prettier */
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardRepository } from './board.repository';
import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBoardsDto } from './dto/SearchBoardsDto';
import { Page } from './page';
import { Like } from 'typeorm';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
console.log(process.env.AWS_ACCESS_KEY_ID)
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});


@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    //게시글 작성
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>{
        if(!createBoardDto){
            throw new NotFoundException("You have a null value on each attributes");
        }
        return this.boardRepository.createBoard(createBoardDto, user);

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
            found = await this.getPagination(page, sortObj, title);
        }
        else if(!title){
            total = await this.boardRepository.count();
            found = await this.getPagination2(page, sortObj, category);
        }
        else {
            total = await this,this.boardRepository.count({category});
            found = await this.getPaginationByCategoryAndTitle(page, category, title, sortObj);
        }
        return new Page(total, page.pageSize, found);
    }
    async getPaginationByCategoryAndTitle(page, category, title, sortObj){
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

    async getPagination2(page, sortObj, category){
        console.log(sortObj);
        const boards = await this.boardRepository.find({
            where: {category: Like(`%${category}%`)},
            take : page.getLimit(),
            skip : page.getOffset(),
            order: sortObj,
        });
        return boards;
    }
    
    async fileupload(@Req() req, @Res() res) {
        try {
          this.upload(req, res, function(error) {
            if (error) {
              console.log(error);
              return res.status(404).json(`Failed to upload image file: ${error}`);
            }
            return res.status(201).json(req.files[0].location);
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json(`Failed to upload image file: ${error}`);
        }
      }
    
      upload = multer({
        storage: multerS3({
          s3: s3,
          bucket: AWS_S3_BUCKET_NAME,
          acl: 'public-read',
          key: function(request, file, cb) {
            cb(null, `${Date.now().toString()} - ${file.originalname}`);
          },
        }),
      }).array('upload', 1);
    }

