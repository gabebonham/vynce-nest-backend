import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQuery } from '../common/pagination.query';
import { UserRepository } from '../database/repository/user.repository';
import { PaginatedResponse } from '../common/api-response.dto';
import { UserEntity } from 'src/database/entity/user.entity';
import { UpdateUserDto } from './update-user.dto';
import { UserResponseDto } from './user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(name: string, password: string, email: string, location: string, age: number): Promise<UserEntity> {

    return await this.userRepository.create({name, password, email, location, age});
  }
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async getByEmailAndPassword(email: string, password: string) {
    const user = await this.userRepository.findByEmailAndPassword(email, password);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async getPaginated(dto: PaginationQuery): Promise<PaginatedResponse> {
    return await this.userRepository.findAllPaginated(dto.page, dto.limit);
  }
  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const newUser = await this.userRepository.update(id, { ...user, ...data });
    return newUser;
  }
  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}