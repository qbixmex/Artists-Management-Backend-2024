import { UpdateUserDTO } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface UpdateUserInterface {
  execute(dto: UpdateUserDTO): Promise<UserEntity>;
}

class UpdateUserUseCase implements UpdateUserInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(dto: UpdateUserDTO): Promise<UserEntity> {
    return this.repository.update(dto);
  }

}

export default UpdateUserUseCase;
