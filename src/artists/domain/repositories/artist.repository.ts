import { GetAllResponse, QueryParams } from '../../types';
import { CreateArtistDTO, UpdateArtistDTO, DeleteArtistDTO} from '../dtos';
import { ArtistEntity } from '../entities';

interface ArtistRepository {
  getAll(queryParams: QueryParams): Promise<GetAllResponse>;
  getById(id: string): Promise<ArtistEntity>;
  create(dto: CreateArtistDTO): Promise<ArtistEntity>;
  update(dto: UpdateArtistDTO): Promise<ArtistEntity>;
  delete(dto: DeleteArtistDTO): Promise<ArtistEntity>;
}

export default ArtistRepository;
