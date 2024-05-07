import { ArtistDataSource } from '../../domain/data-source';
import { CreateArtistDTO, UpdateArtistDTO, DeleteArtistDTO } from '../../domain/dtos';
import { ArtistEntity } from '../../domain/entities';
import { CustomError } from '../../../common/errors';
import { isValidUUID } from '../../../helpers';
import { Artist } from '../../application';
import { GetAllResponse, QueryParams } from '../../types';

class MongoDataSourceImplementation implements ArtistDataSource {

  async getAll(queryParams: QueryParams): Promise<GetAllResponse> {

    const [total, artists] = await Promise.all([
      Artist.countDocuments(),
      Artist.find()
        .sort({ [queryParams.orderBy]: (queryParams.order === 'asc') ? 1 : -1 })
        .limit(queryParams.limit)
        .skip((queryParams.page - 1) * (queryParams?.limit))
    ]);

    if (artists.length === 0) {
      return {
        total: 0,
        artists: [],
      };
    }

    return {
      total,
      artists: artists.map((artist) => ArtistEntity.fromObject({
        id: artist.uuid,
        fullName: {
          value: artist.fullName.value,
          visible: artist.fullName.visible,
        },
        artistName: artist.artistName,
        slug: artist.slug,
        profileImage: artist.artistPhoto,
        visible: artist.visible,
      }))
    };
  }

  async getById(id: string): Promise<ArtistEntity> {
    if (!isValidUUID(id)) {
      throw new CustomError(`Invalid id: ${id} !`, 400);
    }

    const artist = await Artist.findOne({ uuid: id });

    if (!artist) {
      throw new CustomError(`Artist with id: ${id}, not found !`, 404);
    }

    return ArtistEntity.fromObject({
      id: artist!.uuid,
      fullName: {
        value: artist!.fullName.value,
        visible: artist!.fullName.visible,
      },
      artistName: artist!.artistName,
      slug: artist!.slug,
      artistPhoto: artist!.artistPhoto,
      visible: artist!.visible,
      pictures: artist!.pictures,
      location: artist!.location,
      biography: artist!.biography,
      labels: artist!.labels,
      socialMedia: artist!.socialMedia?.map((item) => ({
        url: item.url,
        visible: item.visible,
      })),
      onlineStores: artist!.onlineStores?.map((item) => ({
        url: item.url,
        visible: item.visible,
      })),
      streaming: artist!.streaming?.map((item) => ({
        url: item.url,
        visible: item.visible,
      })),
    });
  }

  async create(createArtistDTO: CreateArtistDTO): Promise<ArtistEntity> {
    const artistExists = await Artist.findOne({ artistName: createArtistDTO.artistName });

    if (artistExists) {
      throw new CustomError(`Artist name: ${createArtistDTO.artistName}, already exists !`, 400);
    }

    try {
      const newArtist = await Artist.create(createArtistDTO);

      return ArtistEntity.fromObject({
        id: newArtist!.uuid,
        fullName: {
          value: newArtist!.fullName.value,
          visible: newArtist!.fullName.visible,
        },
        artistName: newArtist!.artistName,
        slug: newArtist!.slug,
        artistPhoto: newArtist!.artistPhoto,
        visible: newArtist!.visible,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

  async update(updateArtistDTO: UpdateArtistDTO): Promise<ArtistEntity> {
    const foundArtist = await Artist.findOne({ uuid: updateArtistDTO.id });

    if (!foundArtist) {
      throw new CustomError(`Artist with id: ${updateArtistDTO.id}, not found !`, 404);
    }

    try {
      const updatedArtist = await Artist.findOneAndUpdate(
        { uuid: updateArtistDTO.id },
        updateArtistDTO,
        { new: true }
      );

      return ArtistEntity.fromObject({
        id: updatedArtist!.uuid,
        fullName: {
          value: updatedArtist!.fullName.value,
          visible: updatedArtist!.fullName.visible,
        },
        artistName: updatedArtist!.artistName,
        slug: updatedArtist!.slug,
        artistPhoto: updatedArtist!.artistPhoto,
        visible: updatedArtist!.visible,
        pictures: updatedArtist!.pictures,
        location: updatedArtist!.location,
        biography: updatedArtist!.biography,
        genres: updatedArtist!.genres,
        labels: updatedArtist!.labels,
        socialMedia: updatedArtist!.socialMedia?.map((item) => ({
          url: item.url,
          visible: item.visible,
        })),
        onlineStores: updatedArtist!.onlineStores?.map((item) => ({
          url: item.url,
          visible: item.visible,
        })),
        streaming: updatedArtist!.streaming?.map((item) => ({
          url: item.url,
          visible: item.visible,
        })),
      });

    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

  async delete(dto: DeleteArtistDTO): Promise<ArtistEntity> {

    const artistExists = await Artist.findOne({ uuid: dto.id });

    if (!artistExists) {
      throw new CustomError(`Artist with id: ${dto.id}, not found !`, 400);
    }

    try {
      const deletedArtist = await Artist.findOneAndDelete({ uuid: dto.id });
      return ArtistEntity.fromObject({
        id: deletedArtist!.uuid,
        fullName: deletedArtist!.fullName,
        artistName: deletedArtist!.artistName,
        slug: deletedArtist!.slug,
        artistPhoto: deletedArtist!.artistPhoto,
        visible: deletedArtist!.visible,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

}

export default MongoDataSourceImplementation;