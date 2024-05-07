import { CreateArtistDTO, UpdateArtistDTO, DeleteArtistDTO } from '../dtos';
import { ArtistEntity } from '../entities';
import { GetAllResponse, QueryParams } from '../../types/index';

interface ArtistDataSource {
  create(createArtistDTO: CreateArtistDTO): Promise<ArtistEntity>;
  getAll(queryParams: QueryParams): Promise<GetAllResponse>;
  getById(id: string): Promise<ArtistEntity>;
  update(updateTodoDTO: UpdateArtistDTO): Promise<ArtistEntity>;
  delete(dto: DeleteArtistDTO): Promise<ArtistEntity>;
}

export default ArtistDataSource;
