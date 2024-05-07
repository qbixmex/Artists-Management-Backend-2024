import { UpdateArtistDTO } from '../dtos';
import { ArtistEntity } from '../entities';
import { ArtistRepository } from '../repositories';

interface UpdateUserInterface {
  execute(dto: UpdateArtistDTO): Promise<ArtistEntity>;
}

class UpdateArtistUseCase implements UpdateUserInterface {

  constructor(
    private readonly repository: ArtistRepository,
  ) {}

  execute(dto: UpdateArtistDTO): Promise<ArtistEntity> {
    return this.repository.update(dto);
  }

}

export default UpdateArtistUseCase;
