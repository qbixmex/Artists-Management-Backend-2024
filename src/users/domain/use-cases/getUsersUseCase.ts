import { GetAllResponse, QueryParams } from '../../types';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export interface GetUsersInterface {
  execute(queryParams: QueryParams): Promise<GetAllResponse>;
}

class GetUsersUseCase implements GetUsersInterface {

  constructor(
    private readonly repository: UserRepository,
  ) {}

  execute(queryParams: QueryParams): Promise<GetAllResponse> {
    return this.repository.getAll(queryParams);
  }

}

export default GetUsersUseCase;
