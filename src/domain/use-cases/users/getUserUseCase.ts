import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface GetUserInterface {
  execute(id: string): Promise<UserEntity>;
}

class GetUserUseCase implements GetUserInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(id: string): Promise<UserEntity> {
    return this.repository.show(id);
  }

}

export default GetUserUseCase;
