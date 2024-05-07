import { GetAllResponse, QueryParams } from '../../types';
import { ArtistRepository } from '../repositories';

export interface GetArtistsInterface {
  execute(queryParams: QueryParams): Promise<GetAllResponse>;
}

class GetArtistsUseCase implements GetArtistsInterface {

  constructor(
    private readonly repository: ArtistRepository,
  ) {}

  execute(queryParams: QueryParams): Promise<GetAllResponse> {
    return this.repository.getAll(queryParams);
  }

}

export default GetArtistsUseCase;
