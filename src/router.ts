import { Router } from 'express';
import { UserRoutes } from './users/application';
import { ArtistsRoutes } from './artists/application';

class AppRouter {
  
  static get routes(): Router {

    const router = Router();

    router.use('/api/v1/users', UserRoutes.routes);
    router.use('/api/v1/artists', ArtistsRoutes.routes);

    return router;

  }
}

export default AppRouter;
