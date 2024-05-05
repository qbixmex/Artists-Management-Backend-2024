import { GetAllResponse, QueryParams } from '../../types';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { UserEntity } from '../entities';

interface UserRepository {
  getAll(queryParams: QueryParams): Promise<GetAllResponse>;
  getById(id: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  create(dto: CreateUserDTO): Promise<UserEntity>;
  update(dto: UpdateUserDTO): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}

export default UserRepository;
