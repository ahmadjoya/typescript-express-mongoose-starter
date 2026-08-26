import { cleanEnv, port, str, makeValidator } from 'envalid';

const secret = makeValidator<string>((value: string) => {
  if (!value || value.trim().length === 0) throw new Error('Expected a non-empty value');
  if (value === 'secretKey') {
    // eslint-disable-next-line no-console
    console.warn('[env] SECRET_KEY is still the default placeholder - change it before deploying to production.');
  }
  return value;
});

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
    PORT: port({ default: 3000 }),
    SECRET_KEY: secret(),
    DB_HOST: str({ default: '127.0.0.1' }),
    DB_PORT: port({ default: 27017 }),
    DB_DATABASE: str({ default: 'dev' }),
    DB_URI: str({ default: '' }),
    LOG_FORMAT: str({ default: 'dev' }),
    LOG_DIR: str({ default: 'logs' }),
    ORIGIN: str({ default: '*' }),
    CREDENTIALS: str({ choices: ['true', 'false'], default: 'true' }),
  });
};

export default validateEnv;
