/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { BaseEntity, OneToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Board } from './../boards/boards.entity';
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({
        name:"user_id"
    })
    id: number;

    @Column({length:100, unique: true})
    email: string;

    @Column({length:100})
    password: string;

    @Column({ nullable: true })
    @Exclude()
    currentHashedRefreshToken?: string;

    @OneToMany(type => Board, board => board.user, {eager : true})
    boards: Board[]
    
}