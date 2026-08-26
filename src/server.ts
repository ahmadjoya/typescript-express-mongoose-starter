import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

const shutdown = async (signal: string) => {
  logger.info(`${signal} received - shutting down gracefully`);
  try {
    await app.close();
    process.exit(0);
  } catch (error) {
    logger.error(`Error during shutdown: ${error}`);
    process.exit(1);
  }
};

const bootstrap = async () => {
  await app.connectToDatabase();
  app.listen();

  (['SIGINT', 'SIGTERM'] as const).forEach(signal => {
    process.on(signal, () => void shutdown(signal));
  });
};

bootstrap().catch(error => {
  logger.error(`❌ Failed to start the server: ${error}`);
  process.exit(1);
});
