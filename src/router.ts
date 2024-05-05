import { Router } from 'express';
import { UserRoutes } from './users/application';

class AppRouter {
  
  static get routes(): Router {

    const router = Router();

    router.use('/api/v1/users', UserRoutes.routes);

    return router;

  }
}

export default AppRouter;
