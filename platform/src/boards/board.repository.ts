/* eslint-disable prettier/prettier */
import { Board } from './boards.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}