import request, { Response } from 'supertest';

import app from '../src/app';

describe('Likes in repositories', () => {
  let repository_id: string;

  beforeAll(async () => {
    const {
      body: { data },
    }: Response = await request(app)
      .post('/repositories')
      .send({
        title: 'Happy',
        techs: ['NodeJs', 'ReactJs', 'React Native'],
        url: 'https://github.com/matheusmaximianomv/happy',
      });

    repository_id = data.id;
  });

  test('Should be able to give a like to the repository', async () => {
    const response: Response = await request(app).post(
      `/repositories/${repository_id}/likes`
    );

    return expect(response.status).toBe(200);
  });

  test('Should not be able to like a repository that does not exist', async () => {
    const invalid_id: string = '123456-123456-123456-123456';

    const response: Response = await request(app).post(
      `/repositories/${invalid_id}/likes`
    );

    return expect(response.status).toBe(400);
  });
});
