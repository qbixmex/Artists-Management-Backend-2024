import crypto from 'node:crypto';
import { Request, Response } from 'express';
import { UserRepository } from '../domain/repositories';
import {
  GetUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../domain';
import { CreateUserDTO, UpdateUserDTO } from '../domain/dtos';
import { CustomError } from '../domain/errors';
import { QueryParams, RequestCreate, RequestUpdate } from '../types';

class UserController {

  constructor(
    private readonly usersRepository: UserRepository,
  ) {}

  public getAll = async (
    request: Request<never, never, never, QueryParams>,
    response: Response
  ) => {
    const {
      order = 'asc',
      orderBy = 'firstName',
      limit = 10,
      page = 1,
    } = request.query;

    try {

      const { total, users } = await new GetUsersUseCase(this.usersRepository)
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
        users
      });

    } catch (error) {
      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message });
      }
    }

  }

  public getUserById = async (
    request: Request<{ id: string }, never, never, { email: string }>,
    response: Response
  ) => {
    try {
      if (!request.params.id) {
        throw new CustomError("Missing ID parameter !", 400);
      }

      const user = await new GetUserByIdUseCase(this.usersRepository)
        .execute(request.params.id);
      
      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message })
      }
    }
  }
  public getUserByEmail = async (
    request: Request<{ email: string }, never, never, { email: string }>,
    response: Response
  ) => {
    try {
      if (!request.params.email) {
        throw new CustomError("Missing email parameter !", 400);
      }

      const user = await new GetUserByEmailUseCase(this.usersRepository)
        .execute(request.params.email);
      
      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ error: error.message })
      }
    }
  }

  public create = async (
    request: Request<never, never, RequestCreate>,
    response: Response
  ) => {

    const [ error, createUserDTO ] = CreateUserDTO.create({
      uuid: crypto.randomUUID(),
      ...request.body,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    try {

      const user = await new CreateUserUseCase(this.usersRepository)
        .execute(createUserDTO!);

      return response.status(201).json({
        message: "User created successfully 👍",
        user,
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

  public update = async (
    request: Request<{ id: string }, never, RequestUpdate>,
    response: Response
  ) => {
    const [ error, updateTodoDTO ] = UpdateUserDTO.update({
      id: request.params.id,
      ...request.body,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    try {

      const user = await new UpdateUserUseCase(this.usersRepository)
        .execute(updateTodoDTO!);

      return response.status(200).json(user)

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
    try {

      const user = await new DeleteUserUseCase(this.usersRepository)
        .execute(request.params.id);

      return response.status(200).json({
        message: "User deleted successfully 👍",
        user
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

export default UserController;
