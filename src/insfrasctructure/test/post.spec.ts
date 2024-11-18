import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../module/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdPostId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/signin')
      .send({
        email: 'test1@gmail.com',
        password: 'test1234',
      });
    accessToken = loginResponse.body.data.accessTokens;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /post/create', () => {
    it('should create a post successfully', async () => {

      const response = await request(app.getHttpServer())
        .post('/post/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ content: "ini isi konten" });

      expect(response.status).toBe(201);
      expect(response.body.data.content).toBe("ini isi konten");

      createdPostId = response.body.data.id;
    });
  });

  describe('GET /post', () => {
    it('should return all posts', async () => {
      const response = await request(app.getHttpServer())
        .get('/post')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /post/:id', () => {
    it('should return a post by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/post/${createdPostId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.content).toBe("ini isi konten");
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/post/99999')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /post/:id', () => {
    it('should update a post successfully', async () => {
        const response = await request(app.getHttpServer())
            .put(`/post/${createdPostId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({content: "ini isi konten yang baru"});
        console.log(response)
        expect(response.status).toBe(201);
        expect(response.body.content).toBe("ini isi konten yang baru");
    });
  });

  describe('DELETE /post/:id', () => {
    it('should delete a post successfully', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/post/${createdPostId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/post/${createdPostId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });
  });
});
