/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
   
    title:string;

    content:string;

    price: number;

    image: string;

    createdDate: Date;

    category: string;

}