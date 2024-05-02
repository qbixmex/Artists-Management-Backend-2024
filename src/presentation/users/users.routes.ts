import { Router } from "express";
import UsersController from "./users.controller";
import { UserDataSourceImplementation } from "../../infrastructure/datasource";
import { UserRepositoryImplementation } from "../../infrastructure/repository";

class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new UserDataSourceImplementation();
    const repository = new UserRepositoryImplementation(datasource);
    const usersController = new UsersController(repository);

    router.get('/', usersController.list);
    router.get('/:id', usersController.show);
    router.post('/', usersController.create);
    router.patch('/:id', usersController.update);
    router.delete('/:id', usersController.delete);

    return router;

  }

}

export default UserRoutes;
