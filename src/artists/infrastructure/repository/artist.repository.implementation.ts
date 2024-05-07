import {
  ArtistEntity,
  CreateArtistDTO,
  UpdateArtistDTO,
  DeleteArtistDTO,
  ArtistRepository,
  ArtistDataSource,
} from '../../domain';
import { GetAllResponse, QueryParams } from '../../types';

class ArtistRepositoryImplementation implements ArtistRepository {

  constructor(
    private readonly dataSource: ArtistDataSource,
  ) {}

  create(createArtistDTO: CreateArtistDTO): Promise<ArtistEntity> {
    return this.dataSource.create(createArtistDTO);
  }

  getAll(queryParams: QueryParams): Promise<GetAllResponse> {
    return this.dataSource.getAll(queryParams);
  }

  getById(id: string): Promise<ArtistEntity> {
    return this.dataSource.getById(id);
  }

  update(updateArtistDTO: UpdateArtistDTO): Promise<ArtistEntity> {
    return this.dataSource.update(updateArtistDTO);
  }

  delete(dto: DeleteArtistDTO): Promise<ArtistEntity> {
    return this.dataSource.delete(dto);
  }

}

export default ArtistRepositoryImplementation;
