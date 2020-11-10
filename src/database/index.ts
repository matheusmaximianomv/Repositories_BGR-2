import IRepository from '../app/models/IRepository';

import IDatabaseResponse from './IDatabaseResponse';

class Database {
  private repositories: Array<IRepository>;

  constructor() {
    this.repositories = [];
  }

  public findAll(): Array<IRepository> {
    return this.repositories;
  }

  public findById(id: string): IDatabaseResponse {
    const index: number = this.repositories.findIndex(
      (repository) => repository.id === id
    );

    if (index < 0) {
      return {
        status: false,
      };
    }

    return { status: true, index, data: this.repositories[index] };
  }

  public create(repository: IRepository): IDatabaseResponse {
    this.repositories.push(repository);

    const index: number = this.repositories.length - 1;

    return { status: true, index, data: this.repositories[index] };
  }

  public update(id: string, updatedData: IRepository): IDatabaseResponse {
    const index: number = this.repositories.findIndex(
      (repository) => repository.id === id
    );

    if (index < 0) {
      return { status: false };
    }

    this.repositories[index] = updatedData;

    return { status: true, index, data: this.repositories[index] };
  }

  public delete(id: string): IDatabaseResponse {
    const index: number = this.repositories.findIndex(
      (repository) => repository.id === id
    );

    if (index < 0) {
      return { status: false };
    }

    this.repositories = this.repositories.filter(
      (repository) => repository.id !== id
    );

    return { status: true };
  }
}

export default new Database();
