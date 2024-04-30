import { Router } from "express";
import UsersRoutes from "./users/users.routes";

class AppRouter {
  
  static get routes(): Router {

    const router = Router();

    router.use('/api/v1/users', UsersRoutes.routes);

    return router;
  }
}

export default AppRouter;
