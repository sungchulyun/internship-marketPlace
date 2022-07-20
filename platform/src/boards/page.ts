/* eslint-disable prettier/prettier */
export class Page<T> {
    pageSize: number;
    totalCount: number;
    totalPage: number;
    boards: T[];
    constructor(totalCount: number, pageSize: number, boards: T[]) {
      this.pageSize = pageSize;
      this.totalCount = totalCount;
      this.totalPage = Math.ceil(totalCount / pageSize);
      this.boards = boards;
    }
  }