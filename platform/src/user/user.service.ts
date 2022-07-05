import { User } from './user.entity';
import { UserRepository } from './user.repository';
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {}
    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }
    async create(user: User): Promise<void> {
        await this.userRepository.save(user);
        console.log('post success!');
      }
}