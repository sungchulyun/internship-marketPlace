/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user', schema: 'board'})
export class User {
    @PrimaryGeneratedColumn({
        name:"user_id"
    })
    id: number;

    @Column({length:100})
    email: string;

    @Column({length:100})
    password: string;
}