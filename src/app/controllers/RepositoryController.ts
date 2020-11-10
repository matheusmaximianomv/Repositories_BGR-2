import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

import Repository from '../../database';
import IDatabaseResponse from '../../database/IDatabaseResponse';

import IRepository from '../models/IRepository';

class RepositoryController {
  public index(req: Request, res: Response): Response {
    const repositories: Array<IRepository> = Repository.findAll();

    return res.status(200).json(repositories);
  }

  public store(req: Request, res: Response): Response {
    const { title, url, techs } = req.body;

    const id: string = uuid();
    const likes: number = 0;

    const data: IRepository = {
      id,
      title,
      url,
      techs,
      likes,
    };

    const object: IDatabaseResponse = Repository.create(data);

    return res.status(201).json(object);
  }

  public update(req: Request, res: Response): Response {
    const { id } = req.params;
    const { title, url, techs } = req.body;

    const repository: IDatabaseResponse = Repository.findById(id);

    if (!repository.status) {
      return res
        .status(400)
        .json({ error: 'Não existe repositório com esse id.' });
    }

    const newDate: IRepository = {
      id,
      title,
      url,
      techs,
      likes: repository.data?.likes,
    };

    const status: IDatabaseResponse = Repository.update(id, newDate);

    return res.status(200).json(status);
  }

  public delete(req: Request, res: Response): Response {
    const { id } = req.params;

    const repository: IDatabaseResponse = Repository.findById(id);

    if (!repository.status) {
      return res
        .status(400)
        .json({ error: 'Não existe repositório com esse id.' });
    }

    Repository.delete(id);

    return res.status(204).json();
  }
}

export default new RepositoryController();
