import { UpdateUserDTO } from "../dtos";
import CreateUserDTO from "../dtos/user/create-user.dto";
import { UserEntity } from "../entities";

abstract class UserRepository {
  abstract list(): Promise<UserEntity[]>;
  abstract show(id: string): Promise<UserEntity>;
  abstract create(dto: CreateUserDTO): Promise<UserEntity>;
  abstract update(dto: UpdateUserDTO): Promise<UserEntity>;
  abstract delete(id: string): Promise<UserEntity>;
}

export default UserRepository;
