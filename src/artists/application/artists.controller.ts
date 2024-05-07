import crypto from 'node:crypto';
import { Request, Response } from 'express';
import { ArtistRepository } from '../domain/repositories';
import {
  GetArtistsUseCase,
  GetArtistByIdUseCase,
  CreateArtistUseCase,
  UpdateArtistUseCase,
  DeleteArtistUseCase,
} from '../domain';
import { CreateArtistDTO, UpdateArtistDTO , DeleteArtistDTO } from '../domain/dtos';
import { CustomError } from '../../common/errors';
import { QueryParams, RequestBodyCreate } from '../types';

class ArtistController {

  constructor(
    private readonly artistRepository: ArtistRepository,
  ) {}

  public getAll = async (
    request: Request<never, never, never, {
      order: string;
      orderBy: string;
      limit: string;
      page: string;
    }>,
    response: Response) => {
    const {
      order = 'asc',
      orderBy = 'artistName',
      limit = 10,
      page = 1,
    } = request.query as unknown as QueryParams;

    try {

      const { total, artists } = await new GetArtistsUseCase(this.artistRepository)
        .execute({
          order,
          orderBy,
          limit: +limit,
          page: +page,
        });

      return response.status(200).json({
        pagination: {
          total,
          limit: +limit ?? 0,
          next: ((+page * +limit) < total) ? `page=${(+page + 1)}` : null,
          previous: (+page - 1 !== 0) ? `page=${(+page - 1)}` : null,
          page: +page,
        },
        artists,
      });

    } catch (error) {
      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message });
      }
    }
  }

  public getArtistById = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    try {
      if (!request.params.id) {
        throw new CustomError("Missing ID parameter !", 400);
      }

      const user = await new GetArtistByIdUseCase(this.artistRepository)
        .execute(request.params.id);
      
      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message })
      }
    }
  }

  public create = async (
    request: Request<never, never, RequestBodyCreate>,
    response: Response
  ) => {
    const { fullName, artistName, artistPhoto } = request.body;

    const [ error, createArtistDTO ] = CreateArtistDTO.create({
      uuid: crypto.randomUUID(),
      fullName: {
        value: fullName,
        visible: false,
      },
      artistName: artistName,
      artistPhoto: artistPhoto,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    try {

      const artist = await new CreateArtistUseCase(this.artistRepository)
        .execute(createArtistDTO!);

      return response.status(201).json({
        message: "Artist created successfully 👍",
        artist,
      });

    } catch (error) {

      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message })
      }

      console.log(error);

      return response.status(500).json({
        error: "Unexpected error found, check logs for details !"
      });

    }
  }

  public update = async (request: Request, response: Response) => {
    const [ error, updateArtistDTO ] = UpdateArtistDTO.update({
      id: request.params.id,
      ...request.body
    });

    if (error) {
      return response.status(400).json({ error });
    }

    try {

      const artist = await new UpdateArtistUseCase(this.artistRepository)
        .execute(updateArtistDTO!);

      return response.status(200).json({
        message: "Artist updated successfully",
        artist
      });

    } catch (error) {

      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message })
      }

      console.log(error);

      return response.status(500).json({
        error: "Unexpected error found, check logs for details !"
      });

    }
  }

  public delete = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {

    const [ error, deleteArtistDTO ] = DeleteArtistDTO.run(request.params.id);

    if (error) {
      return response.status(400).json({ error });
    }

    try {

      const artist = await new DeleteArtistUseCase(this.artistRepository)
        .execute(deleteArtistDTO!);

      return response.status(200).json({
        message: "User deleted successfully 👍",
        artist: {
          id: artist.id,
          fullName: artist.fullName.value,
          artistName: artist.artistName,
        }
      });

    } catch (error) {

      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message })
      }

      console.log(error);

      return response.status(500).json({
        error: "Unexpected error found, check logs for details !"
      });

    }
  }
}

export default ArtistController;
