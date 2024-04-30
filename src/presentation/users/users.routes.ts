import { Router } from "express";
import { UsersController } from ".";

class UserRoutes {

  static get routes(): Router {

    const router = Router();
    const usersController = new UsersController();

    router.get('/', usersController.list);
    router.get('/:id', usersController.show);
    router.post('/', usersController.create);
    router.patch('/:id', usersController.update);
    router.delete('/:id', usersController.delete);

    return router;

  }

}

export default UserRoutes;
