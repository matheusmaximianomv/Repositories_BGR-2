import { Router, Request, Response } from 'express';

import RepositoryController from './app/controllers/RepositoryController';
import LikeController from './app/controllers/LikeController';

const routes: Router = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    name: 'Desafio 2',
    description:
      'Desafio proposto pelo bootcamp da rocketseat, porém nesse projeto, adicionando outros conceitos para fixar outros conteúdos',
  });
});

routes.get('/repositories', RepositoryController.index);
routes.post('/repositories', RepositoryController.store);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.delete);

routes.post('/repositories/:id/likes', LikeController.store);

export default routes;
