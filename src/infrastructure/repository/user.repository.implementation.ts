import { UserEntity } from '../../domain/entities';
import { UserRepository } from '../../domain/repositories';
import { UserDataSource } from '../../domain/data-source';
import CreateUserDTO from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../domain/dtos';

class UserRepositoryImplementation implements UserRepository {

  constructor(
    private readonly dataSource: UserDataSource,
  ) {}

  create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.dataSource.create(createUserDTO);
  }

  list(): Promise<UserEntity[]> {
    return this.dataSource.list();
  }

  show(id: string): Promise<UserEntity> {
    return this.dataSource.show(id);
  }

  update(updateTodoDTO: UpdateUserDTO): Promise<UserEntity> {
    return this.dataSource.update(updateTodoDTO);
  }

  delete(id: string): Promise<UserEntity> {
    return this.dataSource.delete(id);
  }

}

export default UserRepositoryImplementation;
