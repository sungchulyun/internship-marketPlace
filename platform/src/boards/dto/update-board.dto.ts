/* eslint-disable prettier/prettier */
import { CreateBoardDto } from './create-board.dto'
import { PartialType } from '@nestjs/mapped-types'
export class UpdateBoardDto extends PartialType(CreateBoardDto) {

    updatedDate: Date;
}