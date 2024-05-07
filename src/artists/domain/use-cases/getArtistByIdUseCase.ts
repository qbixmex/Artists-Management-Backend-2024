import { ArtistEntity } from '../entities';
import { ArtistRepository } from '../repositories';

export interface GetArtistByIdInterface {
  execute(id: string): Promise<ArtistEntity>;
}

class GetArtistByIdUseCase implements GetArtistByIdInterface {

  constructor(
    private readonly repository: ArtistRepository,
  ) {}

  async execute(id: string): Promise<ArtistEntity> {
    return await this.repository.getById(id);
  }

}

export default GetArtistByIdUseCase;
