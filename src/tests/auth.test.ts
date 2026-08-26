import bcrypt from 'bcrypt';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4!' };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}signup`).send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('signup');
    });

    it('responds 409 when the email is already registered', async () => {
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4!' };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({ _id: 'existing', email: userData.email, password: 'hash' });

      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}signup`).send(userData);

      expect(response.status).toBe(409);
    });

    it('responds 400 when the email is not a valid address', async () => {
      const authRoute = new AuthRoute();
      const app = new App([authRoute]);

      const response = await request(app.getServer()).post(`${authRoute.path}signup`).send({ email: 'not-an-email', password: 'q1w2e3r4!' });

      expect(response.status).toBe(400);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4!' };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([authRoute]);

      await request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/)
        .expect(200);
    });

    it('responds 401 when the password does not match', async () => {
      const userData: CreateUserDto = { email: 'test@email.com', password: 'wrong-password' };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);

      expect(response.status).toBe(401);
    });
  });

  describe('[POST] /logout', () => {
    it('responds 401 when no authentication token is supplied', async () => {
      const authRoute = new AuthRoute();
      const app = new App([authRoute]);

      const response = await request(app.getServer()).post(`${authRoute.path}logout`);

      expect(response.status).toBe(401);
    });
  });
});
