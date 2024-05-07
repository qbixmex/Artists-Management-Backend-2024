import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { UserEntity } from '../entities';
import { GetAllResponse, QueryParams } from '../../types/index';

interface UserDataSource {
  create(createUserDTO: CreateUserDTO): Promise<UserEntity>;
  getAll(queryParams: QueryParams): Promise<GetAllResponse>;
  getById(id: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  update(updateTodoDTO: UpdateUserDTO): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}

export default UserDataSource;