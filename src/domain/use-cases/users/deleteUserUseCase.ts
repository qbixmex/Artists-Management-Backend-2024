import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface DeleteUserInterface {
  execute(id: string): Promise<UserEntity>;
}

class DeleteUserUseCase implements DeleteUserInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(id: string): Promise<UserEntity> {
    return this.repository.delete(id);
  }

}

export default DeleteUserUseCase;
