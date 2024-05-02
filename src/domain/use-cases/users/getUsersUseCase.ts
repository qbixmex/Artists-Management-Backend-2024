import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface GetUsersInterface {
  execute(): Promise<UserEntity[]>;
}

class GetUsersUseCase implements GetUsersInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(): Promise<UserEntity[]> {
    return this.repository.list();
  }

}

export default GetUsersUseCase;
