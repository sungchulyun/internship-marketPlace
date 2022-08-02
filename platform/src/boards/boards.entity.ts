/* eslint-disable prettier/prettier */
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;
    
    
    @Column({nullable: true})
    content: string;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    image : string;
    

    @CreateDateColumn(({ type: "timestamp" }))
    createdDate: Date;
 
    @UpdateDateColumn(({ type: "timestamp" }))
    updatedDate: Date;
 
    @Column({nullable: true})
    category : string;

    @ManyToOne(type => User, user => user.boards, {eager: false})
    user: User;
}