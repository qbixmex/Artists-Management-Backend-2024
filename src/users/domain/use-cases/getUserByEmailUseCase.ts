import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export interface GetUserByEmailInterface {
  execute(email: string): Promise<UserEntity>;
}

class GetUserUseCase implements GetUserByEmailInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(email: string): Promise<UserEntity> {
    return this.repository.getByEmail(email);
  }

}

export default GetUserUseCase;
