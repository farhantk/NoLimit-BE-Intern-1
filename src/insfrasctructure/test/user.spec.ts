import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../module/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';  // Import supertest for HTTP requests

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); 
  });

  describe("POST /signup", () => {
    it("Should successfully sign up a new user", async () => {
      const response = await request(app.getHttpServer())
        .post('/signup') 
        .send({
          name: 'testtt',
          email: 'test1@gmail.com',
          password: 'test1234',
        });

      expect(response.status).toBe(201); 
      expect(response.body.data.name).toBe('testtt');
      expect(response.body.data.email).toBe('test1@gmail.com');
      expect(response.body.data).toHaveProperty('id');  
    });

    it("Should fail if email is already registered", async () => {
      const response = await request(app.getHttpServer())
        .post('/signup')
        .send({
          name: 'testtt2',
          email: 'test1@gmail.com',
          password: 'test1234',
        });
  
      expect(response.status).toBe(400); 
      expect(response.body.message).toBe('Email is already in use'); 
    });

    it("Should fail if password is too short", async () => {
      const response = await request(app.getHttpServer())
        .post('/signup')
        .send({
          name: 'testtt3',
          email: 'test4@gmail.com',
          password: '123',
        });
  
      expect(response.status).toBe(400); 
      expect(response.body.message).toContain('Password must more than 8 character'); 
    });

    it("Should fail if the email format is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post('/signup')
        .send({
          name: 'testtt4',
          email: 'invalid-email',
          password: 'test1234',
        });
  
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Email must be a valid email address');
    });
  });

  describe("POST /signin", () => {
    it("Should fail if email is not registered", async () => {
      const response = await request(app.getHttpServer())
        .post('/signin')
        .send({
          email: 'kosong@gmail.com',
          password: 'test1234',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Email not registered');
    });

    it("Should fail if password is incorrect", async () => {
      const response = await request(app.getHttpServer())
        .post('/signin')
        .send({
          email: 'test1@gmail.com',
          password: 'incorrectpassword', 
        });

      expect(response.status).toBe(401); 
      expect(response.body.message).toBe('Wrong password');
    });

    it("Should fail if email format is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post('/signin')
        .send({
          email: 'invalid-email',
          password: 'test1234',
        });

      expect(response.status).toBe(400);  
      expect(response.body.message).toContain('Email must be a valid email address');
      const accessToken = response.body.accessTokens;
    });

    it("Should successfully sign in a user with valid credentials", async () => {
      const response = await request(app.getHttpServer())
        .post('/signin')
        .send({
          email: 'test1@gmail.com',
          password: 'test1234',
        });

      expect(response.status).toBe(200);  
      expect(response.body.data).toHaveProperty('accessTokens');  
    });
  });
});

