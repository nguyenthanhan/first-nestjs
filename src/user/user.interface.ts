import {
  GenericListResponseInterface,
  IGenericResponse,
} from 'src/global/global.interface';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { GenericQueryDto } from 'src/global/global.dto';

export interface UserServiceInterface {
  getUsers(
    query: GenericQueryDto,
  ): Promise<GenericListResponseInterface<UserEntity>>;
  getUserById(id: number): Promise<IGenericResponse<UserEntity>>;
  createUser(body: CreateUserDto): Promise<IGenericResponse<UserEntity>>;
  updateUser(
    id: number,
    body: UpdateUserDto,
  ): Promise<IGenericResponse<UserEntity>>;
  deleteUser(id: number): Promise<IGenericResponse<null>>;
  restoreUser(id: number): Promise<IGenericResponse<null>>;
}
