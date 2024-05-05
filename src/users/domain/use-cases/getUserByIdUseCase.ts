import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export interface GetUserByIdInterface {
  execute(id: string): Promise<UserEntity>;
}

class GetUserUseCase implements GetUserByIdInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserEntity> {
    return await this.repository.getById(id);
  }

}

export default GetUserUseCase;
