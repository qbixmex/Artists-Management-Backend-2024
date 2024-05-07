import { DeleteArtistDTO } from '../dtos';
import { ArtistEntity } from '../entities';
import { ArtistRepository } from '../repositories';

export interface DeleteArtistInterface {
  execute(dto: DeleteArtistDTO): Promise<ArtistEntity>;
}

class DeleteArtistUseCase implements DeleteArtistInterface {

  constructor(
    private readonly repository: ArtistRepository,
  ) {}

  execute(dto: DeleteArtistDTO): Promise<ArtistEntity> {
    return this.repository.delete(dto);
  }

}

export default DeleteArtistUseCase;
