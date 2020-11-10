import IRepository from '../app/models/IRepository';

export default interface IDatabaseResponse {
  status: boolean;
  index?: number;
  data?: IRepository;
}
