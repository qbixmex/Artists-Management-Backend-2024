import { UserRepository } from '../../domain/repositories';
import { UserEntity, CreateUserDTO, UpdateUserDTO, UserDataSource } from '../../domain';
import { GetAllResponse, QueryParams } from '../../types';

class UserRepositoryImplementation implements UserRepository {

  constructor(
    private readonly dataSource: UserDataSource,
  ) {}

  create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.dataSource.create(createUserDTO);
  }

  getAll(queryParams: QueryParams): Promise<GetAllResponse> {
    return this.dataSource.getAll(queryParams);
  }

  getById(id: string): Promise<UserEntity> {
    return this.dataSource.getById(id);
  }

  getByEmail(email: string): Promise<UserEntity> {
    return this.dataSource.getByEmail(email);
  }

  update(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    return this.dataSource.update(updateUserDTO);
  }

  delete(id: string): Promise<UserEntity> {
    return this.dataSource.delete(id);
  }

}

export default UserRepositoryImplementation;
