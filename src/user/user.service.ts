import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: any): Promise<any> {
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<any> {
    return await this.userRepository.find();
  }

  async getByIdUser(id: any): Promise<any> {
    return await this.userRepository.findOne(id);
  }

  // async updateUser(id: number, user: any): Promise<any> {
  //   return this.userRepository.update(id, user);
  // }

  // Çalışmıyor
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  // parola hiçbir zaman gelemsin
  async getUserWithPassword(username: string) {
    return this.userRepository.findOne({
      where: { userName: username },
      select: ['id', 'userName', 'password'],
    });
  }
}
