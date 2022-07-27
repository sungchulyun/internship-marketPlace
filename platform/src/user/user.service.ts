/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}
    
    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }
    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ email: email });
      }
}