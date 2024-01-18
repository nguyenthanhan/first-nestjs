import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericQueryDto } from 'src/global/global.dto';
import { UserServiceInterface } from 'src/user/user.interface';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Like, Repository } from 'typeorm';
import { EUserStatus } from './user.enum';
import { GenericListResponseInterface } from 'src/global/global.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async _getUserById(id: number) {
    const foundUser = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'username', 'age', 'status', 'createdAt'],
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async getUsers(
    query: GenericQueryDto,
  ): Promise<GenericListResponseInterface<UserEntity>> {
    const { keyword, page, size } = query;
    const startPosition = (page - 1) * size;
    const [foundUsers, total] = await this.usersRepository.findAndCount({
      where: (keyword ?? '').trim()
        ? { name: Like(`%${keyword}%`) }
        : undefined,
      select: ['id', 'name', 'email', 'username', 'age', 'status', 'createdAt'],
      skip: startPosition,
      take: size,
      order: { id: 'ASC' },
    });
    return {
      data: {
        page,
        size,
        total,
        items: foundUsers,
      },
    };
  }

  async getUserById(id: number) {
    const foundUser = await this._getUserById(id);
    return { data: foundUser };
  }

  async updateUser(id: number, body: UpdateUserDto) {
    console.log(
      '🚀 ~ file: user.service.ts:84 ~ UserService ~ updateUser ~ body:',
      body,
    );
    const response = await this.usersRepository.update(id, body);
    if (response.affected === 0) {
      throw new NotFoundException(
        `User with ID ${id} not found or not updated`,
      );
    }
    const user = await this._getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { data: user };
  }

  async deleteUser(id: number) {
    const response = await this.usersRepository.delete({ id });
    console.log(
      '🚀 ~ file: user.service.ts:106 ~ UserService ~ deleteUser ~ response:',
      response,
    );
    if (response.affected === 0) {
      throw new NotFoundException(
        `User with ID ${id} not found or not deleted`,
      );
    }
    return {
      message: 'deleted user successfully',
      data: null,
    };
  }

  async restoreUser(id: number) {
    await this.usersRepository.restore({ id });
    const response = await this.usersRepository.restore(id);
    if (response.affected === 0) {
      throw new NotFoundException(
        `User with ID ${id} not found or not deleted`,
      );
    }
    return {
      message: 'restore user successfully',
      data: null,
    };
  }
}
