/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    content:string;

    prize: number;

    image: string;
}