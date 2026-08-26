import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`, quiet: true });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  NODE_ENV = 'development',
  PORT = '3000',
  DB_HOST = '127.0.0.1',
  DB_PORT = '27017',
  DB_DATABASE = 'dev',
  DB_URI,
  SECRET_KEY,
  LOG_FORMAT = 'dev',
  LOG_DIR = 'logs',
  ORIGIN = '*',
} = process.env;
