/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";
import { PageRequest } from "src/pageRequest";

export class SearchBoardsDto extends PageRequest{
    @IsString()
    @IsOptional()
    id : number;

    title:string;
   
    content:string;

    prize: number;

    image: string;
}