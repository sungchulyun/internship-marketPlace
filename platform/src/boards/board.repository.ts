/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto:CreateBoardDto, user:User):Promise<Board>{
        const {title, content, category, image, price} = createBoardDto;

        const board = this.create({
            title,
            content,
            category,
            image,
            price,
            user

        })

        await this.save(board);
        return board;
    }
}