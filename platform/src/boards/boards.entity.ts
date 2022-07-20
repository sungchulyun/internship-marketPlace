/* eslint-disable prettier/prettier */
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    content: string;

    @Column({nullable: true})
    prize: number;

    @Column({nullable: true})
    image : string;

    @CreateDateColumn(({ type: "timestamp" }))
    createdDate: Date;
 
    @UpdateDateColumn(({ type: "timestamp" }))
    updatedDate: Date;

}