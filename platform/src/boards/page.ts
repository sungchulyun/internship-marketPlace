/* eslint-disable prettier/prettier */
import { Board } from 'src/boards/boards.entity';
export class Page<T> {
    pageSize: number;
    totalCount: number;
    totalPage: number;
    Board: T[];
    constructor(totalCount: number, pageSize: number, Board: T[]) {
      this.pageSize = pageSize;
      this.totalCount = totalCount;
      this.totalPage = Math.ceil(totalCount / pageSize);
      this.Board = Board;
    }
  }