import { Request, Response } from 'express';

import Repository from '../../database';
import IDatabaseResponse from '../../database/IDatabaseResponse';

import IRepository from '../models/IRepository';

class LikeController {
  public store(req: Request, res: Response): Response {
    const { id } = req.params;

    const repository: IDatabaseResponse = Repository.findById(id);

    if (!repository.status) {
      return res.status(400).json({ error: 'O repositório não existe' });
    }

    const repositoryUpdated: IRepository = {
      id,
      title: repository.data?.title || '',
      techs: repository.data?.techs || [],
      url: repository.data?.url || '',
      likes: (repository.data?.likes || 0) + 1,
    };

    const { data }: IDatabaseResponse = Repository.update(
      id,
      repositoryUpdated
    );

    return res.status(200).json(data);
  }
}

export default new LikeController();
