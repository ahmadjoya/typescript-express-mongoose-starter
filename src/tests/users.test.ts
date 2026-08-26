import bcrypt from 'bcrypt';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import UsersRoute from '@routes/users.route';

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        { _id: 'qpwoeiruty', email: 'a@email.com', password: await bcrypt.hash('q1w2e3r4!', 10) },
        { _id: 'alskdjfhg', email: 'b@email.com', password: await bcrypt.hash('a1s2d3f4!', 10) },
        { _id: 'zmxncbv', email: 'c@email.com', password: await bcrypt.hash('z1x2c3v4!', 10) },
      ]);

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).get(`${usersRoute.path}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.message).toBe('findAll');
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: userId,
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).get(`${usersRoute.path}/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('a@email.com');
    });

    it('responds 404 when the user does not exist', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).get(`${usersRoute.path}/missing`);

      expect(response.status).toBe(404);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4' };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).post(`${usersRoute.path}`).send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('created');
    });

    it('responds 409 when the email already exists', async () => {
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4' };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({ _id: 'existing', email: userData.email, password: 'hash' });

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).post(`${usersRoute.path}`).send(userData);

      expect(response.status).toBe(409);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4' };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({ _id: userId, email: userData.email, password: 'hash' });
      users.findByIdAndUpdate = jest.fn().mockReturnValue({ _id: userId, email: userData.email, password: 'newHash' });

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('updated');
    });

    // Regression test for issue #9: the payload used to be wrapped in a `{ userData }`
    // object, so Mongoose silently discarded it and no field was ever updated.
    it('passes the update fields directly to Mongoose and returns the updated document', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = { email: 'updated@email.com', password: 'q1w2e3r4' };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.findByIdAndUpdate = jest.fn().mockReturnValue({ _id: userId, email: userData.email, password: 'newHash' });

      const app = new App([usersRoute]);
      await request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);

      const [calledId, calledPayload, calledOptions] = (users.findByIdAndUpdate as jest.Mock).mock.calls[0];

      expect(calledId).toBe(userId);
      expect(calledPayload).not.toHaveProperty('userData');
      expect(calledPayload.email).toBe(userData.email);
      // the password must be hashed, never stored as sent
      expect(calledPayload.password).not.toBe(userData.password);
      expect(await bcrypt.compare(userData.password, calledPayload.password)).toBe(true);
      // { new: true } is what makes the response the updated document
      expect(calledOptions).toEqual({ new: true });
    });

    it('responds 404 when updating a user that does not exist', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = { email: 'test@email.com', password: 'q1w2e3r4' };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.findByIdAndUpdate = jest.fn().mockReturnValue(null);

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);

      expect(response.status).toBe(404);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: userId,
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      const app = new App([usersRoute]);
      const response = await request(app.getServer()).delete(`${usersRoute.path}/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('deleted');
    });
  });
});
