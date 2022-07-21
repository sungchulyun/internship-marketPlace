/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
   
    title:string;

    content:string;

    prize: number;

    image: string;

    createdDate: Date;

}