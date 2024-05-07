import { Router } from 'express';
import ArtistsController from './artists.controller';
import { MongoDataSourceImplementation, ArtistRepositoryImplementation } from '../infrastructure';

class ArtistsRoutes {

  static get routes(): Router { 

    const router = Router();

    const datasource = new MongoDataSourceImplementation();
    const repository = new ArtistRepositoryImplementation(datasource);
    const artistController = new ArtistsController(repository);

    router.get('/', artistController.getAll);
    router.get('/:id', artistController.getArtistById);
    router.post('/', artistController.create);
    router.patch('/:id', artistController.update);
    router.delete('/:id', artistController.delete);

    return router;

  }

}

export default ArtistsRoutes;
