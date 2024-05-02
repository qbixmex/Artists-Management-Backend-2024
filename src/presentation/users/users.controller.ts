import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repositories';
import { GetUsersUseCase, GetUserUseCase } from '../../domain/use-cases';
import CreateUserDTO from '../../domain/dtos/user/create-user.dto';
import CreateUserUseCase from '../../domain/use-cases/users/createUserUseCase';
import UpdateUserUseCase from '../../domain/use-cases/users/updateUserUseCase';
import { UpdateUserDTO } from '../../domain/dtos';

class UserController {

  constructor(
    private readonly usersRepository: UserRepository,
  ) {}

  public list = (request: Request, response: Response) => {

    new GetUsersUseCase(this.usersRepository)
      .execute()
      .then(users => response.status(200).json(users))
      .catch(error => response.status(400).json({ error }));

  }

  public show = (request: Request, response: Response) => {
    new GetUserUseCase(this.usersRepository)
      .execute(request.params.id)
      .then(user => response.status(200).json(user))
      .catch(error => response.status(400).json({ error }));
  }

  public create = (request: Request, response: Response) => {
    const [ error, createUserDTO ] = CreateUserDTO.create(request.body);

    if (error) {
      return response.status(400).json({ error });
    }

    new CreateUserUseCase(this.usersRepository)
      .execute(createUserDTO!)
      .then(user => response.status(201).json(user))
      .catch(error => response.status(400).json({ error }));
  }

  public update = (
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

    new UpdateUserUseCase(this.usersRepository)
      .execute(updateTodoDTO!)
      .then(user => response.status(200).json(user))
      .catch(error => response.status(400).json({ error }));
  }

  public delete = (request: Request, response: Response) => {
    new GetUserUseCase(this.usersRepository)
      .execute(request.params.id)
      .then(user => response.status(200).json({
        message: "User deleted successfully 👍",
        user
      }))
      .catch(error => response.status(400).json({ error }));
  }
}

export default UserController;
