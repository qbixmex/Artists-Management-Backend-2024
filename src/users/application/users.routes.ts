import { Router } from 'express';
import UsersController from './users.controller';
import { MongoDataSourceImplementation, UserRepositoryImplementation } from '../infrastructure';

class UserRoutes {

  static get routes(): Router { 

    const router = Router();

    const datasource = new MongoDataSourceImplementation();
    const repository = new UserRepositoryImplementation(datasource);
    const usersController = new UsersController(repository);

    router.get('/', usersController.getAll);
    router.get('/:id', usersController.getUserById);
    router.get('/email/:email', usersController.getUserByEmail);
    router.post('/', usersController.create);
    router.patch('/:id', usersController.update);
    router.delete('/:id', usersController.delete);

    return router;

  }

}

export default UserRoutes;
