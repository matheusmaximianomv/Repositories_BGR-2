export default interface IRepository {
  id: string;
  title: string;
  url: string;
  techs: Array<string>;
  likes?: number;
}
