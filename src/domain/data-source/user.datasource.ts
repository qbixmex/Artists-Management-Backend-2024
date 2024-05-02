import CreateUserDTO from '../dtos/user/create-user.dto';
import UpdateUserDTO from '../dtos/user/update-user.dto';
import { UserEntity } from '../entities';

abstract class UserDataSource {

  // abstract create(createTodoDTO: CreateUserDTO): Promise<UserEntity>;

  // TODO: Implement Pagination, Filtering, Sorting
  abstract list(): Promise<UserEntity[]>;
  abstract show(id: string): Promise<UserEntity>;
  abstract create(updateTodoDTO: CreateUserDTO): Promise<UserEntity>;
  abstract update(updateTodoDTO: UpdateUserDTO): Promise<UserEntity>;
  abstract delete(id: string): Promise<UserEntity>;

}

export default UserDataSource;