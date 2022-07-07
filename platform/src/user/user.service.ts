import { User } from '../auth/user.entity';
import { UserRepository } from '../auth/user.repository';
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}
    
    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }
    async create(user: User): Promise<void> {
        await this.userRepository.save(user);
        console.log('post success!');
      }
    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ email: email });
      }
}