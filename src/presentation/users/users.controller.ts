import { Request, Response } from 'express';

class UserController {
  constructor(
    // TODO: private readonly usersRepository: UsersRepository,
  ) {}

  public list(request: Request, response: Response) {
    return response.status(200).json([
      { name: "Michael Gray" },
      { name: "Mathew Demon" },
      { name: "Alice O'Donnell" },
      { name: "Peter Jackson" },
    ]);
  }

  public show(request: Request, response: Response) {
    return response.status(200).json({
      id: request.params.id,
      name: "Michael Gray"
    });
  }

  public create(request: Request, response: Response) {
    return response.status(200).json({
      id: "abc123",
      name: request.body.name,
    });
  }

  public update(request: Request, response: Response) {
    return response.status(200).json({
      message: `User updated successfully.`,
      user: {
        id: request.params.id,
        name: request.body.name,
      }
    });
  }

  public delete(request: Request, response: Response) {
    return response.status(200).json({
      message: `User: ${request.params.id}, deleted successfully.`
    });
  }
}

export default UserController;
