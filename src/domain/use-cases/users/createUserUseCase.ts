import CreateUserDTO from "../../dtos/user/create-user.dto";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface CreateUserInterface {
  execute(dto: CreateUserDTO): Promise<UserEntity>;
}

class CreateUserUseCase implements CreateUserInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(dto: CreateUserDTO): Promise<UserEntity> {
    return this.repository.create(dto);
  }

}

export default CreateUserUseCase;
