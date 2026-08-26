import { ConnectOptions } from 'mongoose';
import { DB_HOST, DB_PORT, DB_DATABASE, DB_URI } from '@config';

/**
 * `DB_URI` takes precedence when set, so a full connection string
 * (e.g. a MongoDB Atlas `mongodb+srv://...` URI) can be used as-is.
 * Otherwise the URL is assembled from the individual host/port/database vars.
 */
export const dbConnection: { url: string; options: ConnectOptions } = {
  url: DB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    autoIndex: process.env.NODE_ENV !== 'production',
  },
};
