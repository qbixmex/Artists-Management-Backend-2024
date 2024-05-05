import { QueryParams } from '../../types';
import { CreateUserDTO } from '../dtos';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

interface CreateUserInterface {
  execute(dto: CreateUserDTO): Promise<UserEntity>;
}

class CreateUserUseCase implements CreateUserInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(dto: CreateUserDTO, queryParams?: QueryParams): Promise<UserEntity> {
    return this.repository.create(dto);
  }

}

export default CreateUserUseCase;
