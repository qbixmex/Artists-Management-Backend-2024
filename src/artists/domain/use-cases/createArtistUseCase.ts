import { CreateArtistDTO } from '../dtos';
import { ArtistEntity } from '../entities';
import { ArtistRepository } from '../repositories';

interface CreateArtistInterface {
  execute(dto: CreateArtistDTO): Promise<ArtistEntity>;
}

class CreateArtistUseCase implements CreateArtistInterface {

  constructor(
    private readonly repository: ArtistRepository,
  ) {}

  execute(dto: CreateArtistDTO): Promise<ArtistEntity> {
    return this.repository.create(dto);
  }

}

export default CreateArtistUseCase;
