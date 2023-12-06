
import * as supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('TourController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tours (GET)', () => {
    return supertest(app.getHttpServer())
      .get('/tours')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveLength(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
