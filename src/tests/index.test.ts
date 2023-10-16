import request from 'supertest';
import App from '@/app';
import IndexRoute from '@routes/index.route';

jest.setTimeout(10000); // Increased timeout for the test

describe('Testing Index', () => {
  let app: App;

  beforeAll(() => {
    app = new App([new IndexRoute()]);
  });

  afterAll(async () => {
    await app.closeDatabaseConnection();
  });

  describe('[GET] /', () => {
    it('response statusCode 200', async () => {
      const response = await request(app.getServer()).get('/');
      expect(response.status).toBe(200);
    });
  });
});
