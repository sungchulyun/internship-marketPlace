/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
}