import request, { Response } from 'supertest';

import app from '../src/app';

describe('Repositories', () => {
  // Repository id created in first test
  let id: string;

  beforeAll(async () => {
    await Promise.all([
      request(app)
        .post('/repositories')
        .send({
          title: 'Be The Hero',
          techs: ['NodeJs', 'ReactJs', 'React Native'],
          url: 'https://github.com/matheusmaximianomv/beTheHero',
        }),
      request(app)
        .post('/repositories')
        .send({
          title: 'Happy',
          techs: ['NodeJs', 'ReactJs', 'React Native'],
          url: 'https://github.com/matheusmaximianomv/happy',
        }),
    ]);
  });

  test('Should be able to create a new repository', async () => {
    const response: Response = await request(app)
      .post('/repositories')
      .send({
        title: 'Agenda Live',
        techs: ['Angular'],
        url: 'https://github.com/matheusmaximianomv/agendalive',
      });

    id = response.body.data.id;

    return expect(response.status).toBe(201);
  });

  test('Should be able to list the repositories', async () => {
    const response: Response = await request(app).get('/repositories');

    return expect(response.status).toBe(200);
  });

  test('Should be able to update repository', async () => {
    const response: Response = await request(app)
      .put(`/repositories/${id}`)
      .send({
        title: 'Twitter - JFX',
        techs: ['Java', 'JFX'],
        url: 'https://github.com/matheusmaximianomv/twitter-jfx',
      });

    return expect(response.body.status).toBe(true);
  });

  test('Should not be able to update a repository that does not exist', async () => {
    const idInvalid: string = '123456-123456-123456-123456';
    const response: Response = await request(app)
      .put(`/repositories/${idInvalid}`)
      .send({
        title: 'Invalid Title',
        techs: ['Invalid', 'Invalid', 'Invalid'],
        url: 'https://github.com/matheusmaximianomv/invalid-repository',
      });

    return expect(response.status).toBe(400);
  });

  test('Should not be able to update repository likes manually', async () => {
    const likesManually: number = 50;
    const response: Response = await request(app)
      .put(`/repositories/${id}`)
      .send({
        title: 'Agenda Live',
        techs: ['Angular'],
        url: 'https://github.com/matheusmaximianomv/agendalive',
        likes: likesManually,
      });

    return expect(response.body.data.likes).not.toBe(likesManually);
  });

  test('Should be able to delete the repository', async () => {
    const response: Response = await request(app).delete(`/repositories/${id}`);

    return expect(response.status).toBe(204);
  });

  test('Should not be able to delete a repository that does not exist', async () => {
    const response: Response = await request(app).delete(`/repositories/${id}`);

    return expect(response.status).toBe(400);
  });
});
