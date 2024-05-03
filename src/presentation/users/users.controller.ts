import crypto from "node:crypto";
import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repositories';
import {
  GetUsersUseCase,
  GetUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../domain/use-cases';
import { CreateUserDTO, UpdateUserDTO } from '../../domain/dtos';
import { Role } from '../../domain/entities';
import { CustomError } from "../../domain/errors";

class UserController {

  constructor(
    private readonly usersRepository: UserRepository,
  ) {}

  public list = (request: Request, response: Response) => {

    new GetUsersUseCase(this.usersRepository)
      .execute()
      .then(users => response.status(200).json(users))
      .catch(error => response.status(error.statusCode).json({ error: error.message }));

  }

  public show = (request: Request, response: Response) => {
    new GetUserUseCase(this.usersRepository)
      .execute(request.params.id)
      .then(user => response.status(200).json(user))
      .catch(error => response.status(error.statusCode).json({ error: error.message }));
  }

  public create = async (
    request: Request<{}, {}, {
      firstName: string;
      lastName: string;
      email: string;
      role: Role;
      password: string;
      imageURL: string;
    }>,
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

  public update = async (
    request: Request<{ id: string }, {}, {
      firstName?: string;
      lastName?: string;
      email?: string;
      active?: boolean;
      role?: string;
    }>,
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

  public delete = async (request: Request, response: Response) => {
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
